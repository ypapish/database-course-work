'use strict';

const http2 = require('node:http2');

const prepareUrl = (url) => {
  const sliced = url.startsWith('/') ? url.slice(1) : url;
  return sliced.endsWith('/') ? sliced.slice(0, sliced.length - 1) : sliced;
};

const asyncPipe = (...methods) => {
  const next = (arg, index = 0) => {
    if (index >= methods.length) return arg;
    const answer = methods[index](arg);
    const callback = (val) => next(val, index + 1);
    return answer.then ? answer.then(callback) : callback(answer);
  };
  return (arg) => next(arg, 0);
};

const getBody = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

const parseBody = (chunks) => {
  try {
    return JSON.parse(chunks.toString());
  } catch {
    return null;
  }
};

const isDataValid = async (data, structure, db) => {
  for (const [field, options] of Object.entries(structure)) {
    const { mandatory, validators, refers } = options;
    if (!data[field]) {
      if (mandatory) return false;
      continue;
    }
    const value = data[field];
    const valid = validators.every((validator) => validator(value));
    if (!valid) return false;
    if (!refers) continue;
    const { table, column, exists } = refers;
    const output = await db(table).where(column, value);
    const existance = output.length > 0;
    if (existance !== exists) return false;
  }
  return true;
};

const wrapData = [
  (data) => ({ success: true, data: data ?? {} }),
  (error) => ({ success: false, message: error.message }),
];

const retrieveBody = asyncPipe(getBody, parseBody);

module.exports = (options, port, controllers, db) => {
  const server = http2.createSecureServer(options);
  server.on('stream', async (stream, headers) => {
    const url = prepareUrl(headers[':path']);
    const exists = controllers.has(url);
    const body = await retrieveBody(stream);
    if (!exists || !body || !body.service || !body.data) {
      stream.respond({ ':status': exists ? 400 : 404 });
      const message = exists ? 'Bad Request' : 'Page Not Found';

      const answer = { success: false, message };
      return void stream.end(JSON.stringify(answer));
    }
    const service = controllers.get(url)[body.service];
    if (!service || !(await isDataValid(body.data, service.structure, db))) {
      stream.respond({ ':status': 400 });
      const answer = { success: false, message: 'Invalid body' };
      return void stream.end(JSON.stringify(answer));
    }
    const { controller } = service;
    const answer = await controller(body.data).then(...wrapData);
    stream.respond({ ':status': 200, 'content-type': 'application/json' });
    stream.end(JSON.stringify(answer));
  });
  server.listen(port);
};

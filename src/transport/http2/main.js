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

const isDataValid = (data, structure) => {
  for (const [field, { mandatory, validators }] of Object.entries(structure)) {
    const exists = field in data;
    if (!exists) {
      if (mandatory) return false;
      continue;
    }
    const value = data[field];
    const valid = validators.every((validator) => validator(value));
    if (!valid) return false;
  }
  return true;
};

const wrapData = [
  (data) => ({ success: true, data }),
  (error) => ({ success: false, message: error.message }),
];

const retrieveBody = asyncPipe(getBody, parseBody);

module.exports = (options, port, controllers) => {
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
    if (!service || !isDataValid(body.data, service.structure)) {
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

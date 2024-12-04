'use strict';

const config = require('./config.json');
const db = require('knex')(config.db);
const load = require('./load.js')(config.sandbox);
const apiServer = require(`./transport/${config.api.transport}`);
const path = require('node:path');
const mapValues = require('./mapValues.js');
const resolvePaths = require('./resolvePaths.js');
const buildStaticUrls = require('./buildStaticUrls.js');
const fsp = require('node:fs/promises');

const keypath = path.join(__dirname, 'cert/key.pem');
const apipath = path.join(__dirname, 'api');
const certpath = path.join(__dirname, 'cert/cert.pem');

const tlsOptions = async (keypath, certpath) => ({
  key: await fsp.readFile(keypath),
  cert: await fsp.readFile(certpath),
});

const sandbox = {
  db,
  console,
  isString: (value) => typeof value === 'string',
  isNumber: (value) => !Number.isNaN(Number.parseInt(value)),
  generateToken: require('node:crypto').randomUUID,
  common: { ...require('./hash.js') },
};

const main = async () => {
  const options = await tlsOptions(keypath, certpath);
  const paths = await resolvePaths(apipath);
  const staticUrls = buildStaticUrls(paths, ['.js']);
  const controllers = await mapValues(staticUrls, load(sandbox));
  apiServer(options, config.api.port, controllers);
};

main();

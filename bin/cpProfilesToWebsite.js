const shell = require('shelljs');

const NODE_ENV = process.env.NODE_ENV || 'development';
const FACET = process.env.FACET || 'dismoi';

shell.cp(
  `./build/${NODE_ENV}/profiles/${FACET}/js/profiles.bundle.js`,
  './src/app/website/static/script/profiles.bundle.js'
);

const shell = require('shelljs');

const NODE_ENV = process.env.NODE_ENV || 'development';
const FACET = process.env.FACET || 'dismoi';

shell.cp(
  '-R',
  `./build/${NODE_ENV}/profiles/${FACET}/*.*`,
  './src/app/website/static/profiles'
);

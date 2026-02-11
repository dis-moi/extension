const shell = require('shelljs');

const NODE_ENV = process.env.NODE_ENV || 'development';

shell.cp(
  '-R',
  `./build/${NODE_ENV}/profiles/dismoi/*.*`,
  './src/app/website/static/profiles'
);

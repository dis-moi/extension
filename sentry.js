/* eslint-disable no-var-requires, @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment */
const { version } = require('./package.json');

// @ts-ignore : This file is used in plain JS in Webpack config
const getRelease = (platform, env) => `webext@${version}-${platform}-${env}`;

module.exports = {
  getRelease,
};

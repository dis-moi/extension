/* eslint-disable no-var-requires, @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-ignore */
const { version } = require('./package.json');

// @ts-ignore : This file is used in plain JS in Webpack config
const getRelease = buildType => `webext@${version}-${buildType}`;

module.exports = {
  getRelease
};

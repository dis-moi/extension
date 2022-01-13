/* eslint-disable no-var-requires, @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-ignore */
const { version } = require('./package.json');

// @ts-ignore : This file is used in plain JS in Webpack config
const getRelease = (platform, nodeEnv, facet) =>
  `webext@${version}-${facet}-${platform}-${nodeEnv}`;

module.exports = {
  getRelease
};

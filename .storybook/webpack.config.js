const path = require('path');
const rules = require('../webpack/config.rules');
const basePlugins = require('../webpack/config.plugins.base');

const env = { build: 'dev' };
const argv = {
  mode: 'development',
  watch: true
};

module.exports = ({ config }) => {
  config.module.rules = rules(env, argv);
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules.push(path.resolve(__dirname, '..', 'src'));
  config.resolve.alias.test = path.resolve(__dirname, '..', 'test');
  config.plugins.push(...basePlugins(env, 'development'));
  config.stats = require('../webpack/config.stats');
  return config;
};

const path = require('path');
const rules = require('../webpack/config.rules');
const basePlugins = require('../webpack/config.plugins.base');

const env = { build: 'dev' };
const argv = {
  mode: 'development',
  watch: true
};

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules = rules(env, argv);
  storybookBaseConfig.resolve.extensions.push('.ts', '.tsx');
  storybookBaseConfig.resolve.modules.push(
    path.resolve(__dirname, '..', 'src')
  );
  storybookBaseConfig.resolve.alias.test = path.resolve(
    __dirname,
    '..',
    'test'
  );
  storybookBaseConfig.plugins.push(...basePlugins(env, 'development'));
  storybookBaseConfig.stats = require('../webpack/config.stats');
  return storybookBaseConfig;
};

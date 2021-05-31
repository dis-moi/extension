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
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(png|jpe?g|gif|mp4)$/i,
      loader: 'file-loader',
      options: {
        publicPath: process.env.PROFILES_ASSETS_PATH,
        name: '[path][name].[ext]',
        context: 'src/assets'
      }
    }
  ];
  config.resolve.modules.push(path.resolve(__dirname, '..', 'src'));
  config.resolve.alias.test = path.resolve(__dirname, '..', 'test');
  //migrate v5->6: Zero config typescript https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#zero-config-typescript
  const basePluginsArray = basePlugins(env, 'development');
  config.plugins.push(...basePluginsArray);
  config.stats = require('../webpack/config.stats');
  return config;
};

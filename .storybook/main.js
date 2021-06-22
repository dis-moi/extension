const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-essentials',
    '@storybook/preset-typescript'
  ],
  webpackFinal: async (config /*, { configType }*/) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: 'src/components/website/atoms/BrowserAnimation/animation.js',
          to: config.output.path
        },
        {
          from: 'src/components/website/assets',
          to: config.output.path
        }
      ])
    );

    // Return the altered config
    return config;
  }
};

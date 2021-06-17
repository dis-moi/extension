const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

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
      new MergeIntoSingleFilePlugin({
        files: {
          'animation.js': [
            path.resolve(
              __dirname,
              '../src/components/website/atoms/BrowserAnimation/createjs.min.js'
            ),
            path.resolve(
              __dirname,
              '../src/components/website/atoms/BrowserAnimation/animation.js'
            )
          ]
        }
      })
    );

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    });

    // Return the altered config
    return config;
  }
};

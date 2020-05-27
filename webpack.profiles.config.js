const path = require('path');
const { DefinePlugin } = require('webpack');
const loadEnv = require('./loadEnv');
const defaultWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePlugins = require('./webpack/config.plugins.base');
const R = require('ramda');

const requiredEnvVarNames = [
  'SENTRY_DSN',
  'SENTRY_ENABLED',
  'NODE_ENV',
  'BACKEND_ORIGIN',
  'REFRESH_CONTRIBUTORS_INTERVAL',
  'CHROME_EXTENSION_ID',
  'FIREFOX_EXTENSION_ID'
];
const formatEnvVar = value => `"${value}"`;

loadEnv({ path: path.resolve(__dirname) });

module.exports = function webpack(env = {}, argv = {}) {
  env = {
    PLATFORM: 'chromium',
    ...process.env,
    ...env
  };

  const defaultWebpackConfig = defaultWebpack(env, argv);

  return {
    ...defaultWebpackConfig,
    entry: defaultWebpackConfig.entry.profiles,
    devServer: {
      historyApiFallback: true,
      stats: 'minimal',
      contentBase: defaultWebpackConfig.output.path
    },
    output: {
      ...defaultWebpackConfig.output,
      filename: 'js/profiles.bundle.js'
    },
    plugins: [
      ...basePlugins(env, argv),
      new HtmlWebpackPlugin({
        template: './views/profiles.pug',
        filename: 'index.html',
        inject: false
      }),
      new DefinePlugin({
        'process.env': R.pipe(
          R.pick(requiredEnvVarNames),
          R.map(formatEnvVar)
        )(env)
      })
    ]
  };
};

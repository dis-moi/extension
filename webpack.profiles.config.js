const path = require('path');
const { DefinePlugin } = require('webpack');
const loadEnv = require('./loadEnv');
const defaultWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const basePlugins = require('./webpack/config.plugins.base');
const R = require('ramda');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

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

  const copyConfig = [
    { from: 'src/assets', to: defaultWebpackConfig.output.path },
    {
      from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      to: path.join(defaultWebpackConfig.output.path, 'js')
    },
    {
      from: 'node_modules/typeface-lato/files/',
      to: path.join(defaultWebpackConfig.output.path, 'fonts/')
    },
    {
      from: 'node_modules/typeface-sedgwick-ave/files/',
      to: path.join(defaultWebpackConfig.output.path, 'fonts/')
    }
  ];

  copyConfig.push({
    from: 'test/integration',
    to: path.join(defaultWebpackConfig.output.path, 'test', 'integration')
  });

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
      }),
      new CopyWebpackPlugin(copyConfig),
      new LodashModuleReplacementPlugin()
    ]
  };
};

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
  'FIREFOX_EXTENSION_ID',
  'PROFILES_ORIGIN',
  'POPULAR_CONTRIBUTORS_IDS'
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
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(png|jpe?g|gif)$/i,
              include: path.resolve(__dirname, 'src/'),
              loader: 'file-loader',
              options: {
                publicPath: env.PROFILES_ASSETS_PATH,
                name: '[path][name].[ext]',
                context: 'src/assets'
              }
            },
            {
              test: /\.(mp4)$/i,
              include: path.resolve(__dirname, 'src/'),
              loader: 'file-loader',
              options: {
                outputPath: 'video',
                publicPath: 'https://profiles.dismoi.io/video/',
                name: '[path][name].[ext]',
                context: 'src/assets/video'
              }
            },
            ...defaultWebpackConfig.module.rules[0].oneOf
          ]
        }
      ]
    },
    entry: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      path.join(path.resolve(__dirname, 'src'), './app/profiles/')
    ],
    devServer: {
      historyApiFallback: true,
      stats: 'minimal',
      noInfo: true,
      contentBase: defaultWebpackConfig.output.path
    },
    output: {
      ...defaultWebpackConfig.output,
      filename: 'js/profiles.bundle.js',
      chunkFilename: 'js/[name].chunk.js'
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
      new CopyWebpackPlugin(
        [
          {
            from: 'src/assets',
            to: defaultWebpackConfig.output.path
          },
          {
            from: 'node_modules/typeface-lato/files/',
            to: path.join(defaultWebpackConfig.output.path, 'fonts/')
          },
          {
            from: 'node_modules/typeface-sedgwick-ave/files/',
            to: path.join(defaultWebpackConfig.output.path, 'fonts/')
          },
          {
            from: 'test/integration',
            to: path.join(
              defaultWebpackConfig.output.path,
              'test',
              'integration'
            )
          },
          {
            from: 'etc/profiles/public',
            to: defaultWebpackConfig.output.path
          }
        ].filter(Boolean)
      ),
      new LodashModuleReplacementPlugin()
    ]
  };
};

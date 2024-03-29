const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const R = require('ramda');
const getManifest = require('../manifest');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const basePlugins = require('../webpack/config.plugins.base');
const { version } = require('../package.json');
const { getRelease } = require('../sentry');
const { getPackageName, getPackageExtension } = require('./packageNaming');

// @todo do we still need to maintain this list?
// I would gladly get rid of it...
const selectEnvVarsToInject = R.pick([
  'FACET',
  'FACET_NAME',
  'WEBSITE_URL',
  'SENTRY_DSN',
  'NODE_ENV',
  'BACKEND_ORIGIN',
  'UNINSTALL_ORIGIN',
  'REFRESH_MC_INTERVAL',
  'REFRESH_CONTRIBUTORS_INTERVAL',
  'TRACKING_URL',
  'TRACKING_SITE_ID',
  'TRACKING_BACKEND',
  'TRACKING_POSTHOG_API_KEY',
  'SENTRY_ENABLED',
  'PLATFORM',
  'CHROME_EXTENSION_ID',
  'FIREFOX_EXTENSION_ID',
  'CHROME_STORE_URL',
  'FIREFOX_STORE_URL',
  'PROFILES_ORIGIN',
  'ACCESSIBLE_CONTRIBUTORS_IDS',
  'PRESELECTED_CONTRIBUTORS_IDS'
]);
const formatEnvVars = R.map(value => `"${value}"`);

const processENVVarsToInject = R.pipe(selectEnvVarsToInject, formatEnvVars);

module.exports = (env = {}, argv = {}, buildPath) => {
  const { NODE_ENV, SENTRY_SEND_VERSION, PLATFORM, ANALYZE, FACET } = env;
  const copyConfig = [
    { from: 'src/assets', to: buildPath },
    {
      from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      to: path.join(buildPath, 'js')
    },
    {
      from: 'node_modules/typeface-lato/files/',
      to: path.join(buildPath, 'fonts/')
    },
    {
      from: 'src/assets/fonts/',
      to: path.join(buildPath, 'fonts/')
    },
    {
      from: 'node_modules/typeface-sedgwick-ave/files/',
      to: path.join(buildPath, 'fonts/')
    },
    {
      from: `src/assets/browserconfig-${FACET}.xml`,
      to: path.join(buildPath, 'browserconfig.xml')
    },
    {
      from: `src/assets/site-${FACET}.webmanifest`,
      to: path.join(buildPath, 'site.webmanifest')
    },
    {
      from: `src/assets/favicons/${FACET}/`,
      to: path.join(buildPath, '/')
    }
  ];

  const plugins = [
    ...basePlugins(env, argv),
    new webpack.DefinePlugin({
      'process.env': processENVVarsToInject(env)
    }),
    new ModuleNotFoundPlugin(path.resolve(__dirname, '..')),
    new HtmlWebpackPlugin({
      template: './views/background.pug',
      filename: 'background.html',
      inject: false
    }),
    new CopyWebpackPlugin(copyConfig),
    new LodashModuleReplacementPlugin()
  ];

  if (env.PLATFORM !== 'profiles') {
    plugins.push(
      new AddAssetWebpackPlugin(
        'manifest.json',
        getManifest(NODE_ENV, PLATFORM, FACET)
      )
    );
  }

  if (SENTRY_SEND_VERSION) {
    plugins.push(
      new SentryWebpackPlugin({
        include: path.resolve(buildPath, 'js'),
        ignore: ['test.*.js*'],
        urlPrefix: '~/js',
        release: getRelease(PLATFORM, NODE_ENV, FACET)
      })
    );
  }

  if (!argv.watch) {
    plugins.push(
      new CleanWebpackPlugin(),
      new ZipPlugin({
        path: '..',
        filename: getPackageName(version, PLATFORM, NODE_ENV, FACET),
        extension: getPackageExtension(PLATFORM)
      })
    );
  }

  if (ANALYZE) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        defaultSizes: 'gzip',
        openAnalyzer: true,
        generateStatsFile: false,
        statsOptions: {
          source: false
        },
        logLevel: 'info'
      })
    );
  }

  return plugins;
};

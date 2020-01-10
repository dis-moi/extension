const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const R = require('ramda');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const basePlugins = require('../webpack/config.plugins.base');
const manifests = require('../manifest');
const { version } = require('../package.json');
const { getRelease } = require('../sentry');

const hours = millis => `${millis}*60*1000`;

const BUILD_CONFIG = {
  dev: {
    BACKEND_ORIGIN: '"https://staging-notices.bulles.fr/api/v3/"',
    REFRESH_MC_INTERVAL: hours(5),
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000'
  },
  devOnProductionApi: {
    BACKEND_ORIGIN: '"https://notices.bulles.fr/api/v3/"',
    REFRESH_MC_INTERVAL: hours(5),
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000'
  },
  devOnDevApi: {
    BACKEND_ORIGIN: '"http://localhost:8088/api/v3/"',
    REFRESH_MC_INTERVAL: hours(5),
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000'
  },
  staging: {
    BACKEND_ORIGIN: '"https://staging-notices.bulles.fr/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.bulles.fr/desinstallation'",
    REFRESH_MC_INTERVAL: hours(5),
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000',
    TRACKING_URL: "'https://stats.lmem.net/matomo.php'",
    TRACKING_SITE_ID: "'5'"
  },
  chromium: {
    BACKEND_ORIGIN: '"https://notices.bulles.fr/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.bulles.fr/desinstallation'",
    REFRESH_MC_INTERVAL: hours(30),
    REFRESH_CONTRIBUTORS_INTERVAL: '30*60*1000',
    TRACKING_URL: "'https://stats.lmem.net/matomo.php'",
    TRACKING_SITE_ID: "'6'"
  },
  firefox: {
    BACKEND_ORIGIN: '"https://notices.bulles.fr/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.bulles.fr/desinstallation'",
    REFRESH_MC_INTERVAL: hours(30),
    TRACKING_URL: "'https://stats.lmem.net/matomo.php'",
    TRACKING_SITE_ID: "'6'"
  }
};

const getApiForDev = api => {
  if (api === 'production') return 'devOnProductionApi';
  if (api === 'dev') return 'devOnDevApi';
  return 'dev';
};

const getBuildConfig = (build, api) =>
  build === 'dev' ? BUILD_CONFIG[getApiForDev(api)] : BUILD_CONFIG[build];

const selectEnvVarsToInject = R.pick([
  'SEND_CONTRIBUTION_FROM',
  'SEND_CONTRIBUTION_TO',
  'SEND_IN_BLUE_TOKEN',
  'SENTRY_DSN',
  'NODE_ENV',
  'TRACKING_URL',
  'TRACKING_SITE_ID'
]);
const formatEnvVars = R.map(value => `"${value}"`);

const processENVVarsToInject = R.pipe(
  selectEnvVarsToInject,
  formatEnvVars
);

module.exports = (env = {}, argv = {}, outputPath) => {
  const buildPath = path.join(outputPath, env.build);

  const copyConfig = [
    { from: 'src/assets', to: buildPath },
    {
      from: 'src/app/lmem/draft-preview/grabDraftNotices.js',
      to: path.join(buildPath, 'js')
    },
    {
      from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      to: path.join(buildPath, 'js')
    },
    {
      from: 'node_modules/typeface-lato/files/',
      to: path.join(buildPath, 'fonts/')
    },
    {
      from: 'node_modules/typeface-sedgwick-ave/files/',
      to: path.join(buildPath, 'fonts/')
    }
  ];

  if (argv.mode !== 'production') {
    copyConfig.push({
      from: 'test/integration',
      to: path.join(outputPath, env.build, 'test', 'integration')
    });
  }

  const plugins = [
    ...basePlugins(env, argv),
    new webpack.DefinePlugin({
      'process.env': {
        ...getBuildConfig(env.build, env.api),
        ...processENVVarsToInject(process.env),
        BUILD: JSON.stringify(env.build),
        SENTRY_ENABLE: env.sentry ? 'true' : 'false'
      }
    }),
    new ModuleNotFoundPlugin(path.resolve(__dirname, '..')),
    new HtmlWebpackPlugin({
      template: './views/background.pug',
      filename: 'background.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: './views/options.pug',
      filename: 'options.html',
      inject: false
    }),
    new AddAssetWebpackPlugin(
      'manifest.json',
      JSON.stringify(manifests[env.firefox ? 'firefoxDev' : env.build], null, 2)
    ),
    new CopyWebpackPlugin(copyConfig),
    new LodashModuleReplacementPlugin()
  ];

  if (env.sentry) {
    plugins.push(
      new SentryWebpackPlugin({
        include: `./build/${env.build}/js`,
        ignore: ['test.*.js*'],
        urlPrefix: '~/js',
        release: getRelease(env.build)
      })
    );
  }

  if (!argv.watch) {
    plugins.push(
      new CleanWebpackPlugin(),
      new ZipPlugin({
        path: '..',
        filename: `bulles-v${version}-${env.build}-unsigned`,
        extension: env.build === 'firefox' ? 'xpi' : 'zip'
      })
    );
  }

  if (env.analyze) {
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

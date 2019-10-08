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
const basePlugins = require('../webpack/config.plugins.base');
const manifests = require('../manifest');
const { version } = require('../package.json');

const BUILD_CONFIG = {
  dev: {
    LMEM_BACKEND_ORIGIN: '"https://staging-notices.lmem.net/api/v3/"',
    REFRESH_MC_INTERVAL: '5*60*1000',
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000'
  },
  devOnProductionApi: {
    LMEM_BACKEND_ORIGIN: '"https://notices.lmem.net/api/v3/"',
    REFRESH_MC_INTERVAL: '5*60*1000',
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000'
  },
  staging: {
    LMEM_BACKEND_ORIGIN: '"https://staging-notices.lmem.net/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    REFRESH_MC_INTERVAL: '5*60*1000',
    REFRESH_CONTRIBUTORS_INTERVAL: '5*60*1000',
    SENTRY_DSN: '"https://a22936b545a54f37b153b3f9e2c98790@sentry.io/1404847"'
  },
  chromium: {
    LMEM_BACKEND_ORIGIN: '"https://notices.lmem.net/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    REFRESH_MC_INTERVAL: '30*60*1000',
    REFRESH_CONTRIBUTORS_INTERVAL: '30*60*1000',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    SENTRY_DSN: '"https://a22936b545a54f37b153b3f9e2c98790@sentry.io/1404847"'
  },
  firefox: {
    LMEM_BACKEND_ORIGIN: '"https://notices.lmem.net/api/v3/"',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    REFRESH_MC_INTERVAL: '30*60*1000',
    REFRESH_CONTRIBUTORS_INTERVAL: '30*60*1000',
    SENTRY_DSN: '"https://a22936b545a54f37b153b3f9e2c98790@sentry.io/1404847"'
  }
};

const getBuildConfig = (build, api) =>
  build === 'dev' && api === 'production'
    ? BUILD_CONFIG['devOnProductionApi']
    : BUILD_CONFIG[build];

const selectEnvVarsToInject = R.pick([
  'SEND_CONTRIBUTION_FROM',
  'SEND_CONTRIBUTION_TO',
  'SEND_IN_BLUE_TOKEN',
  'SENTRY_DSN'
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
      JSON.stringify(manifests[env.build], null, 2)
    ),
    new CopyWebpackPlugin(copyConfig)
  ];

  if (env.sentry) {
    plugins.push(
      new SentryWebpackPlugin({
        include: `./build/${env.build}/js`,
        ignore: ['test.*.js*'],
        release: `web-extension@${version}-${env.build}`
      })
    );
  }

  if (!argv.watch) {
    plugins.push(
      new CleanWebpackPlugin(),
      new ZipPlugin({
        path: '..',
        filename: `lmem-v${version}-${env.build}.zip`
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

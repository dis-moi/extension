const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const R = require('ramda');

const manifests = require('../manifest');
const { version } = require('../package.json');

const BUILD_CONFIG = {
  dev: {
    LMEM_BACKEND_ORIGIN: '"https://staging-notices.lmem.net/api/v3/"'
  },
  staging: {
    LMEM_BACKEND_ORIGIN: '"https://staging-notices.lmem.net/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    HEAP_APPID: '"234457910"', // testing
    REFRESH_MC_INTERVAL: '5*60*1000',
    SENTRY_DSN: '"https://a22936b545a54f37b153b3f9e2c98790@sentry.io/1404847"'
  },
  chromium: {
    LMEM_BACKEND_ORIGIN: '"https://notices.lmem.net/api/v3/"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    REFRESH_MC_INTERVAL: '30*60*1000',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    HEAP_APPID: '"3705584166"', // production
    SENTRY_DSN: '"https://a22936b545a54f37b153b3f9e2c98790@sentry.io/1404847"'
  },
  firefox: {
    LMEM_BACKEND_ORIGIN: '"https://notices.lmem.net/api/v3/"',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    REFRESH_MC_INTERVAL: '30*60*1000',
    // No analytics with Firefox // HEAP_APPID: '"3705584166"',
    SENTRY_DSN: '"https://a22936b545a54f37b153b3f9e2c98790@sentry.io/1404847"'
  }
};

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
    new webpack.DefinePlugin({
      'process.env': {
        ...BUILD_CONFIG[env.build],
        ...processENVVarsToInject(process.env),
        BUILD: JSON.stringify(env.build),
        SENTRY_ENABLE: env.sentry ? 'true' : 'false'
      }
    }),
    new HtmlWebpackPlugin({
      template: './views/background.pug',
      filename: 'background.html',
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

  if (!env.hmr) {
    plugins.push(
      new CleanWebpackPlugin(),
      new ZipPlugin({
        path: '..',
        filename: `lmem-v${version}-${env.build}.zip`
      })
    );
  }

  return plugins;
};

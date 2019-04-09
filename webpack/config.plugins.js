const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetWebpackPlugin = require('add-asset-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const manifests = require('../manifest');
const { version } = require('../package.json');

const ENV = {
  dev: {
    LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"'
  },
  staging: {
    LMEM_BACKEND_ORIGIN: '"https://staging-recommendations.lmem.net"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    HEAP_APPID: '"234457910"', // testing
    REFRESH_MC_INTERVAL: '5*60*1000'
  },
  chromium: {
    LMEM_BACKEND_ORIGIN: '"https://reco2bulle.lmem.net"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    REFRESH_MC_INTERVAL: '30*60*1000',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    HEAP_APPID: '"3705584166"' // production
  },
  firefox: {
    LMEM_BACKEND_ORIGIN: '"https://reco2bulle.lmem.net"',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    REFRESH_MC_INTERVAL: '30*60*1000'
    // No analytics with Firefox // HEAP_APPID: '"3705584166"',
  }
};

module.exports = (env = {}, argv = {}, outputPath) => {
  const buildPath = path.join(outputPath, env.build);

  const copyConfig = [
    { from: 'src/assets', to: buildPath },
    {
      from: 'src/app/lmem/draft-preview/grabDraftRecommendations.js',
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
      'process.env': ENV[env.build]
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

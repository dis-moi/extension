const path = require("path");
const webpack = require("webpack");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CreateFilePlugin = require("create-file-webpack");
const ZipPlugin = require("zip-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const manifests = require("../manifest");
const { version } = require("../package.json");

const ENV = {
  dev: {
    LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"'
  },
  staging: {
    LMEM_BACKEND_ORIGIN: '"https://staging-recommendations.lmem.net"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    HEAP_APPID: '"234457910"', // testing
    REFRESH_MC_INTERVAL: "5*60*1000"
  },
  chromium: {
    LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
    UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
    REFRESH_MC_INTERVAL: "10*60*1000",
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    HEAP_APPID: '"3705584166"' // production
  },
  firefox: {
    LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
    ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
    REFRESH_MC_INTERVAL: "10*60*1000"
  }
};

module.exports = (env = {}, argv = {}, outputPath) => {
  const buildPath = path.join(outputPath, env.build);

  const copyConfig = [
    { from: "src/assets", to: buildPath },
    {
      from: "src/app/lmem/draft-preview/grabDraftRecommendations.js",
      to: path.join(buildPath, "js")
    }
  ];
  if (argv.mode !== "production") {
    copyConfig.push(
      {
        from: "test/infrastructure",
        to: path.join(outputPath, env.build, "test", "infrastructure")
      },
      {
        from: "test/integration",
        to: path.join(outputPath, env.build, "test", "integration")
      }
    );
  }

  const plugins = [
    new HtmlWebpackPlugin({
      template: "./views/background.pug",
      filename: "background.html",
      inject: false
    }),
    new webpack.DefinePlugin({
      "process.env": ENV[env.build]
    }),
    new CreateFilePlugin({
      path: path.join(outputPath, env.build),
      fileName: "manifest.json",
      content: JSON.stringify(manifests[env.build])
    }),
    new CopyWebpackPlugin(copyConfig)
  ];

  if (!env.hmr) {
    plugins.push(
      new WebpackCleanupPlugin({ quiet: true }),
      new ZipPlugin({
        path: "..",
        filename: `lmem-v${version}-${env.build}.zip`
        //   pathPrefix: env.build,
      })
    );
  }

  return plugins;
};

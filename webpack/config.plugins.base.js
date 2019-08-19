const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = (env = {}, argv = {}) => {
  const plugins = [
    new ForkTsCheckerWebpackPlugin({
      async: argv.watch,
      checkSyntacticErrors: true,
      eslint: true, // undefined in CRA
      formatter: argv.mode === 'production' ? typescriptFormatter : undefined,
      reportFiles: ['**', '!**/test/**', '!**/?(*.)(spec|test).*'],
      silent: false, // true in CRA
      tsconfig: path.resolve(__dirname, '..', 'tsconfig.json'),
      // Incremental compilation in incompatible with workers
      useTypescriptIncrementalApi: true
      // workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE // undefined in CRA
    }),
    new FilterWarningsPlugin({
      exclude: /export .* was not found in/
      // Because of:
      // https://github.com/TypeStrong/ts-loader/issues/751
      // https://github.com/TypeStrong/ts-loader/issues/653
      // https://github.com/webpack/webpack/issues/7378
      // https://github.com/babel/babel/issues/8361
    })
  ];

  if (argv.watch) {
    plugins.push(
      new WatchMissingNodeModulesPlugin(
        path.resolve(__dirname, '..', 'node_modules')
      ),
      new CaseSensitivePathsPlugin()
    );
  }

  return plugins;
};

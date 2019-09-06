const path = require('path');
const entry = require('./webpack/config.entry');
const rules = require('./webpack/config.rules');
const plugins = require('./webpack/config.plugins.js');
const stats = require('./webpack/config.stats');

module.exports = function webpack(env = {}, argv = {}) {
  // No .env in develop yet, using argv.mode:
  process.env.NODE_ENV = argv.mode;

  const srcPath = path.resolve(__dirname, 'src');
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [srcPath, 'node_modules'],
      alias: {
        test: path.resolve(__dirname, 'test')
      }
    },
    entry: entry(env, srcPath),
    output: {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[id].chunk.js',
      path: path.join(__dirname, 'build', env.build),
      publicPath: '.'
    },
    module: { rules: rules(env, argv) },
    plugins: plugins(env, argv, path.join(__dirname, 'build')),
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    devtool: argv.watch ? 'eval-source-map' : 'source-map',
    stats
  };
};

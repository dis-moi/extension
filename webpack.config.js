const path = require('path');
const entry = require('./webpack/config.entry');
const rules = require('./webpack/config.rules');
const plugins = require('./webpack/config.plugins.js');
const stats = require('./webpack/config.stats');

module.exports = function webpack(env = {}, argv = {}) {
  const srcPath = path.resolve(__dirname, 'src');
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [srcPath, 'node_modules']
    },
    entry: entry(env, srcPath),
    output: {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[id].chunk.js',
      path: path.join(__dirname, 'build', env.build),
      publicPath: '.'
    },
    module: { rules: rules(argv.mode) },
    plugins: plugins(env, argv, path.join(__dirname, 'build')),
    devtool: env.hmr ? 'eval-source-map' : 'source-map',
    stats
  };
};

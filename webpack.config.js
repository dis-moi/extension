const path = require('path');
const dotenv = require('dotenv');
const entry = require('./webpack/config.entry');
const rules = require('./webpack/config.rules');
const plugins = require('./webpack/config.plugins.js');
const stats = require('./webpack/config.stats');

const isEmail = value =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

dotenv.config({ path: path.resolve('.env') });

const {
  SEND_CONTRIBUTION_TO,
  SEND_CONTRIBUTION_FROM,
  SEND_IN_BLUE_TOKEN
} = process.env;

if (!SEND_IN_BLUE_TOKEN || typeof SEND_IN_BLUE_TOKEN !== 'string') {
  throw new Error('Please provide SEND_IN_BLUE_TOKEN env variable');
}
if (!isEmail(SEND_CONTRIBUTION_FROM)) {
  throw new Error('Please provide SEND_CONTRIBUTION_FROM env variable');
}
if (!isEmail(SEND_CONTRIBUTION_TO)) {
  throw new Error('Please provide SEND_CONTRIBUTION_TO env variable');
}

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

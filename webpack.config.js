const path = require('path');
const loadEnv = require('./loadEnv');
const entry = require('./webpack/config.entry');
const rules = require('./webpack/config.rules');
const plugins = require('./webpack/config.plugins.js');
const stats = require('./webpack/config.stats');
const { getBuildPath } = require('./webpack/packageNaming');

// const {} = packageNaming;

const isEmail = value =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

loadEnv({ path: path.resolve(__dirname) });

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
  env = {
    PLATFORM: 'chromium',
    ...process.env,
    ...env
  };

  const srcPath = path.resolve(__dirname, 'src');

  const { NODE_ENV, PLATFORM } = env;
  const buildPath = path.resolve(__dirname, getBuildPath(PLATFORM, NODE_ENV));

  console.info('Building package to: ', buildPath);

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
      path: buildPath,
      publicPath: ''
    },
    module: { rules: rules(env, argv) },
    plugins: plugins(env, argv, buildPath),
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

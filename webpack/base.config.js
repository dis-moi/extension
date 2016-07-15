import path from 'path';
import webpack from 'webpack';

const baseConfig = ({ input, output = {}, globals = {}, plugins, loaders }) => ({
  entry: input,
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
    ...output
  },
  globals: globals,
  plugins: [
    new webpack.DefinePlugin(globals),
    ...(plugins ||
    [
      new webpack.optimize.DedupePlugin()
    ])
  ],
  resolve: {
    alias: {
      app: path.join(__dirname, '../src/app'),
      extension: path.join(__dirname, '../src/browser/extension')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      ...(loaders || [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }]),
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
      }
    ]
  }
});

export default baseConfig;

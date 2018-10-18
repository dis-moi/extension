import path from 'path';
import webpack from 'webpack';

const srcPath = path.join(__dirname, '../src/app');

const baseConfig = ({ input, output = {}, globals = {}, plugins = [], loaders = [] }) => ({
  entry: Object.assign(
    {
      background: [path.join(srcPath, './background/')],
      content: [path.join(srcPath, './content/')],
      options: [path.join(srcPath, './options/')],
      popup: [path.join(srcPath, './popup/')],
    },
    input
  ),
  output: Object.assign(
    {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[id].chunk.js'
    },
    output
  ),
  globals: globals,
  plugins: [
    new webpack.DefinePlugin(globals),
    ...plugins
  ],
  resolve: {
    alias: {
      app: srcPath,
      extension: path.join(srcPath, './background')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss?$/,
        // FIXME handle styles and assets injection through Webpack style- and css- loaders
        // see ../src/app/background/index.js
        loaders: ['css-loader', 'sass-loader']
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader'
      },
    ].concat(loaders),
  }
});

export default baseConfig;

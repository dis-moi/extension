import path from 'path';

const srcPath = path.join(__dirname, '../src/app');

const baseConfig = ({
  input, output = {}, plugins = [], rules = [], ...rest 
}) => ({
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
  plugins: [
    ...plugins
  ],
  resolve: {
    alias: {
      app: srcPath,
      extension: path.join(srcPath, './background')
    },
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src/')
        ],
        use: [
          { loader: 'babel-loader' },
        ],

      },
      {
        test: /\.scss?$/,
        include: [
          path.resolve(__dirname, '../src/')
        ],
        // FIXME handle styles and assets injection through Webpack style- and css- loaders
        // see ../src/app/background/index.js
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.svg/,
        include: [
          path.resolve(__dirname, '../src/')
        ],
        use: [
          { loader: 'svg-url-loader' },
        ]
      }
    ].concat(rules),
  },
  ...rest,
});

export default baseConfig;

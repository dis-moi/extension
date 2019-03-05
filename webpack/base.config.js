import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const srcPath = path.join(__dirname, '../src/app');

const baseConfig = ({
    mode, input, output = {}, plugins = [], rules = [], ...rest
}) => ({
  mode,
  entry: Object.assign(
    {
      background: ['@babel/polyfill', path.join(srcPath, './background/')],
      content: ['@babel/polyfill', path.join(srcPath, './content/')]
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
    new HtmlWebpackPlugin({ template: './views/background.pug', filename: 'background.html', inject: false }),
    ...plugins
  ],
  resolve: {
    alias: {
      app: srcPath,
      extension: path.join(srcPath, './background')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src/')
        ],
        use: [
          { loader: 'babel-loader' },
          { loader: 'stylelint-custom-processor-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
      },
      {
        test: /\.scss?$/,
          include: [
            path.resolve(__dirname, '../src/app/'),
          ],
          oneOf: [
              {
                  resourceQuery: /external/, // foo.css?inline
                  use: [
                      "css-loader", // translates CSS into CommonJS
                      "sass-loader" // compiles Sass to CSS, using Node Sass by default
                  ]
              },
              {
                  resourceQuery: /inline/, // foo.css?external
                  use: [
                      "style-loader", // creates style nodes from JS strings
                      "css-loader", // translates CSS into CommonJS
                      "sass-loader" // compiles Sass to CSS, using Node Sass by default
                  ]
              }
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
      },
      {
          test: /\.(jade|pug)$/,
          use: {
              loader: 'pug-loader',
              options: {
                  pretty: mode === 'development',
              }
          },
          include: [ path.resolve(__dirname, '../views/') ],
      }
    ].concat(rules),
  },
  ...rest,
});

export default baseConfig;

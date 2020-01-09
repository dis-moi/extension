const path = require('path');

module.exports = (env, argv) => {
  const rules = [
    {
      oneOf: [
        // Process application JS with Babel.
        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [
            path.resolve(__dirname, '..', 'src'),
            path.resolve(__dirname, '..', '.storybook'),
            path.resolve(__dirname, '..', 'test')
          ],
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [
                'react-app',
                {
                  flow: false,
                  typescript: true
                }
              ]
            ],
            customize: require.resolve(
              'babel-preset-react-app/webpack-overrides'
            ),
            plugins: [
              //              require.resolve('babel-plugin-named-asset-import'),
              'babel-plugin-styled-components'
            ],
            cacheDirectory: Boolean(argv.watch),
            cacheCompression: false,
            compact: false
          }
        },
        // Process any JS outside of the app with Babel.
        // Unlike the application JS, we only compile the standard ES features.
        /* {
          test: /\.(js|mjs)$/,
          exclude: [
            /@babel(?:\/|\\{1,2})runtime/,
            path.resolve(__dirname, '..', 'node_modules')
          ],
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            compact: false,
            presets: [
              [
                require.resolve('babel-preset-react-app/dependencies'),
                { helpers: true }
              ]
            ],
            cacheDirectory: Boolean(argv.watch),
            cacheCompression: false,
            sourceMaps: false
          }
        }, */
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        },
        {
          test: /\.(png)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: 'src/assets/',
            publicPath: '/'
          }
        },
        {
          test: /\.(woff2?)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
            publicPath: '/fonts'
          }
        },
        {
          test: /\.(jade|pug)$/,
          use: {
            loader: 'pug-loader',
            options: {
              pretty: argv.mode === 'development'
            }
          },
          include: [path.resolve(__dirname, '../views/')]
        }
      ]
    }
  ];

  return rules;
};

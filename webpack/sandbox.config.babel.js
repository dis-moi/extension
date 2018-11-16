import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  devtool: 'none',
  entry: {
    app: './src/app/sandbox/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'LMEM - Sandbox' }),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          'babel-loader',
          'eslint-loader',
          'stylelint-custom-processor-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      react: path.resolve(path.join(__dirname, '../node_modules/react')),
      'babel-core': path.resolve(path.join(__dirname, '../node_modules/@babel/core')),
    },
  },
};

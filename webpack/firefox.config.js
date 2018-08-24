import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/app/');

export default baseConfig({
  input: {
    background: [`${srcPath}background/`],
    content: [`${srcPath}content/`],
    options: [`${srcPath}options/`],
  },
  output: {
    path: path.join(__dirname, '../build/firefox'),
    publicPath: '.', // No remote URL with Firefox
  },
  // No analytics with Firefox
  loaders: [{
    test: /lib\/heap/,
    loader: 'null-loader',
  }],
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
  globals: {
    'process.env': {
      NODE_ENV: '"production"',
      LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
      LMEM_SCRIPTS_ORIGIN: "'.'", // Use local build
      //HEAP_APPID: '"3705584166"', // No analytics with Firefox
    }
  },
});

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
    path: path.join(__dirname, '../build/chromium'),
    publicPath: '.',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    })
  ],
  globals: {
    'process.env': {
      NODE_ENV: '"production"',
      LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
      LMEM_SCRIPTS_ORIGIN: "'.'",
      UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
      ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
      HEAP_APPID: '"3705584166"', // production
    }
  }
});

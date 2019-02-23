import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

export default baseConfig({
  mode: 'development',
  input: {
    test: [path.join(__dirname, '../test/integration/')],
  },
  output: {
    path: path.join(__dirname, '../build/staging'),
    publicPath: '.',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"staging"',
        LMEM_BACKEND_ORIGIN: '"https://staging-recommendations.lmem.net"',
        LMEM_SCRIPTS_ORIGIN: '\'.\'',
        UNINSTALL_ORIGIN: '\'https://www.lmem.net/desinstallation\'',
        HEAP_APPID: '"234457910"', // testing
        REFRESH_MC_INTERVAL: '5*60*1000',
      }
    })
  ],
});

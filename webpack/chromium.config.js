import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';


export default baseConfig({
  mode: 'production',
  output: {
    path: path.join(__dirname, '../build/chromium'),
    publicPath: '.',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
        LMEM_SCRIPTS_ORIGIN: '\'.\'',
        UNINSTALL_ORIGIN: '\'https://www.lmem.net/desinstallation\'',
        REFRESH_MC_INTERVAL: '10*60*1000',
        ONBOARDING_ORIGIN: '"https://bienvenue.lmem.net?extensionInstalled"',
        HEAP_APPID: '"3705584166"', // production
      }
    }),
  ],
});

import path from 'path';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/app/');

export default baseConfig({
  output: {
    path: path.join(__dirname, '../build/staging'),
    publicPath: '.',
  },
  globals: {
    'process.env': {
      NODE_ENV: '"staging"',
      LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
      LMEM_SCRIPTS_ORIGIN: "'.'",
      UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
      HEAP_APPID: '"234457910"', // testing
      REFRESH_MC_INTERVAL: '5*60*1000',
    }
  }
});

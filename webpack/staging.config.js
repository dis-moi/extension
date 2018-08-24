import path from 'path';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/app/');

export default baseConfig({
  input: {
    background: [`${srcPath}background/`],
    content: [`${srcPath}content/`],
    options: [`${srcPath}options/`]
  },
  output: {
    path: path.join(__dirname, '../build/staging'),
    publicPath: '.',
    sftp: {
      // See .ftppass https://github.com/gtg092x/gulp-sftp#authentication
      auth: 'keyMain',
      host: 'sftp.dc0.gpaas.net',
      remotePath: '/lamp0/web/vhosts/testing-ui.lmem.net/htdocs/'
    }
  },
  globals: {
    'process.env': {
      NODE_ENV: '"staging"',
      LMEM_BACKEND_ORIGIN: '"https://recommendations.lmem.net"',
      LMEM_SCRIPTS_ORIGIN: "'.'",
      UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
      HEAP_APPID: '"234457910"', // testing
    }
  }
});

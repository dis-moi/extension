import path from 'path';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/browser/');

export default baseConfig({
  input: {
    background: [`${srcPath}extension/background/`],
    content: [`${srcPath}extension/content/`]
  },
  output: {
    path: path.join(__dirname, '../build/staging'),
    publicPath: 'https://testing.ui.lmem.net',
    sftp: {
      // See .ftppass https://github.com/gtg092x/gulp-sftp#authentication
      auth: 'keyMain',
      host: 'sftp.dc0.gpaas.net',
      remotePath: '/lamp0/web/vhosts/testing.ui.lmem.net/htdocs/'
    }
  },
  globals: {
    'process.env': {
      NODE_ENV: '"staging"',
      LMEM_BACKEND_ORIGIN: '"https://preprod-lmem-craft-backend.cleverapps.io"',
      LMEM_SCRIPTS_ORIGIN: "'https://testing.ui.lmem.net'",
      HEAP_APPID: '"234457910"', // testing
    }
  }
});

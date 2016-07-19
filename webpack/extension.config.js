import path from 'path';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/browser/');

export default baseConfig({
  input: {
    background: [`${srcPath}extension/background/`],
    window: [`${srcPath}window/`],
    popup: [`${srcPath}extension/popup/`],
    content: [`${srcPath}extension/content/`]
  },
  output: {
    path: path.join(__dirname, '../build/extension'),
    publicPath: 'https://ui.lmem.net',
    sftp: {
      // See .ftppass https://github.com/gtg092x/gulp-sftp#authentication
      auth: 'keyMain',
      host: 'sftp.dc0.gpaas.net',
      remotePath: '/lamp0/web/vhosts/ui.lmem.net/htdocs/'
    }
  },
  globals: {
    'process.env': {
      NODE_ENV: '"production"'
    }
  }
});

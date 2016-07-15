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
      host: 'sftp.dc0.gpaas.net',
      user: '3249456',
      //keyLocation: "<path_to_my_custom_rsa_key>",
      remotePath: '/lamp0/web/vhosts/ui.lmem.net/htdocs/'
    }
  },
  globals: {
    'process.env': {
      NODE_ENV: '"production"',
      BACKEND_URL: 'http://lmem-craft-backend.cleverapps.io'
    }
  }
});

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
    path: path.join(__dirname, '../build/production'),
    publicPath: 'https://ui.lmem.net',
    sftp: {
      // See .ftppass https://github.com/gtg092x/gulp-sftp#authentication
      auth: 'keyMain',
      host: 'sftp.dc0.gpaas.net',
      remotePath: '/lamp0/web/vhosts/ui.lmem.net/htdocs/'
    }
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
      LMEM_SCRIPTS_ORIGIN: "'https://ui.lmem.net'",
      UNINSTALL_ORIGIN: "'https://www.lmem.net/desinstallation'",
      HEAP_APPID: '"3705584166"', // production
    }
  }
});

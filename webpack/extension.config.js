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
    path: path.join(__dirname, '../build/extension')
  },
  globals: {
    'process.env': {
      NODE_ENV: '"production"'
    }
  }
});

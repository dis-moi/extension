import path from 'path';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/browser/');
const testPath = path.join(__dirname, '../test/');


export default baseConfig({
  input: {
    background: [`${srcPath}extension/background/`],
    content: [`${srcPath}extension/content/`],
    test: [`${testPath}integration/`]
  },
  output: {
    path: path.join(__dirname, '../build/dev'),
    publicPath: '.'
  },
  globals: {
    'process.env': {
      NODE_ENV: '"development"',
      LMEM_BACKEND_ORIGIN: '"https://staging.recommendations.lmem.net"',
      LMEM_SCRIPTS_ORIGIN: "'.'", // Use local build
    }
  }
});

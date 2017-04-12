import path from 'path';
import baseConfig from './base.config';
const srcPath = path.join(__dirname, '../src/app/');
const testPath = path.join(__dirname, '../test/');


export default baseConfig({
  input: {
    background: [`${srcPath}background/`],
    content: [`${srcPath}content/`],
    options: [`${srcPath}options/`],
    test: [`${testPath}integration/`]
  },
  output: {
    path: path.join(__dirname, '../build/dev'),
    publicPath: '.'
  },
  globals: {
    'process.env': {
      NODE_ENV: '"development"',
      LMEM_BACKEND_ORIGIN: '"https://preprod-lmem-craft-backend.cleverapps.io"',
      LMEM_SCRIPTS_ORIGIN: "'.'", // Use local build
    }
  }
});

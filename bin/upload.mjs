const { execFile } = require('child_process');

const { PLATFORM } = process.env;

const file =
  PLATFORM === 'firefox' ? 'web-ext-sign.mjs' : 'chrome-webstore-upload.mjs';

execFile(file, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

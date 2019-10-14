const dev = require('./dev');
const firefoxDev = require('./firefoxDev');
const staging = require('./staging');
const chromium = require('./chromium');
const firefox = require('./firefox');

module.exports = {
  dev,
  staging,
  chromium,
  firefox,
  firefoxDev
};

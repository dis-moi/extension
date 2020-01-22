const manifests = require('../manifest');

const getManifestFilename = (env, platform) => {
  if (env === 'development') {
    if (platform === 'firefox') {
      return 'firefoxDev';
    }
    return 'dev';
  } else if (env === 'production') {
    return platform;
  }

  return env;
};

const getManifest = (env, platform) =>
  JSON.stringify(manifests[getManifestFilename(env, platform)], null, 2);

module.exports = getManifest;

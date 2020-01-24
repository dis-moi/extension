const getManifestFilepath = (env, platform) => `./${env}/${platform}.js`;

const getManifest = (env, platform) => {
  console.log(getManifestFilepath(env, platform));
  return JSON.stringify(require(getManifestFilepath(env, platform)), null, 2);
};

module.exports = getManifest;

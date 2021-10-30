const getManifestFilepath = (env, platform) => `./${env}/${platform}.js`;

const getManifest = (env, platform, facet) => {
  console.log(getManifestFilepath(env, platform));
  return JSON.stringify(
    require(getManifestFilepath(env, platform))(facet),
    null,
    2
  );
};

module.exports = getManifest;

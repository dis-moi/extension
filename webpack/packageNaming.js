const path = require('path');

const getPackageName = (version, platform, env, facet) =>
  `${facet}-v${version}-${platform}${env !== 'production' ? '-' + env : ''}`;

const getPackageExtension = platform =>
  platform === 'firefox' ? 'xpi' : 'zip';

const getPackageNameWithExtension = (version, platform, env, facet) =>
  `${getPackageName(version, platform, env, facet)}.${getPackageExtension(
    platform
  )}`;

const getBuildPath = (platform, env, facet) =>
  path.join('build', env, platform, facet);

const getPackageDir = (platform, env, facet) =>
  path.join(getBuildPath(platform, env, facet), '..');

const getPackagePath = (version, platform, env, facet) =>
  path.join(
    getPackageDir(platform, env, facet),
    getPackageNameWithExtension(version, platform, env, facet)
  );

module.exports = {
  getPackageName,
  getPackageExtension,
  getPackageNameWithExtension,
  getBuildPath,
  getPackageDir,
  getPackagePath
};

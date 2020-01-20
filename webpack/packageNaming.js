const path = require('path');

const getPackageName = (version, platform, env) =>
  `bulles-v${version}-${platform}${env !== 'production' ? '-' + env : ''}`;

const getPackageExtension = platform =>
  platform === 'firefox' ? 'xpi' : 'zip';

const getPackageNameWithExtension = (version, platform, env) =>
  `${getPackageName(version, platform, env)}.${getPackageExtension(platform)}`;

const getBuildPath = (platform, env) => path.join('build', env, platform);

const getPackageDir = (platform, env) =>
  path.join(getBuildPath(platform, env), '..');

const getPackagePath = (version, platform, env) =>
  path.join(
    getPackageDir(platform, env),
    getPackageNameWithExtension(version, platform, env)
  );

module.exports = {
  getPackageName,
  getPackageExtension,
  getPackageNameWithExtension,
  getBuildPath,
  getPackageDir,
  getPackagePath
};

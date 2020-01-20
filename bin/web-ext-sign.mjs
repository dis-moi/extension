import path from 'path';
import fs from 'fs';
import signAddon from 'sign-addon';
import pjson from '../package.json';
import loadEnv from '../loadEnv';
import packageNaming from '../webpack/packageNaming';

const { getPackageDir, getPackagePath } = packageNaming;

loadEnv({ path: path.resolve() });

const { FIREFOX_API_KEY, FIREFOX_API_SECRET, NODE_ENV } = process.env;
const { version } = pjson;

const packageDir = path.resolve(getPackageDir('firefox', NODE_ENV));
const packagePath = path.resolve(getPackagePath(version, 'firefox', NODE_ENV));

signAddon
  .default({
    // Required arguments:
    xpiPath: packagePath,
    version,
    apiKey: FIREFOX_API_KEY,
    apiSecret: FIREFOX_API_SECRET,

    // Optional arguments:

    // The explicit extension ID.
    // WebExtensions do not require an ID.
    // See the notes below about dealing with IDs.
    // id: 'your-addon-id@somewhere',
    // The release channel (listed or unlisted).
    // Ignored for new add-ons, which are always unlisted.
    // Default: most recently used channel.
    channel: 'unlisted',
    // Save downloaded files to this directory.
    // Default: current working directory.
    downloadDir: packageDir,
    // Number of milleseconds to wait before aborting the request.
    // Default: 2 minutes.
    timeout: undefined,
    // Optional proxy to use for all API requests,
    // such as "http://yourproxy:6000"
    // Read this for details on how proxy requests work:
    // https://github.com/request/request#proxies
    apiProxy: undefined,
    // Optional object to pass to request() for additional configuration.
    // Some properties such as 'url' cannot be defined here.
    // Available options:
    // https://github.com/request/request#requestoptions-callback
    apiRequestConfig: undefined,
    // Optional override to the number of seconds until the JWT token for
    // the API request expires. This must match the expiration time that
    // the API server accepts.
    apiJwtExpiresIn: undefined,
    // Optional override to the URL prefix of the signing API.
    // The production instance of the API will be used by default.
    apiUrlPrefix: 'https://addons.mozilla.org/api/v4'
  })
  .then(result => {
    if (result.success) {
      console.log('The following signed files were downloaded:');
      fs.rename(result.downloadedFiles[0], packagePath, error => {
        if (error) {
          throw error;
        }
        console.log(
          `${result.downloadedFiles[0]}
renamed to 
${packagePath}.`
        );
      });

      console.log(result.downloadedFiles);
      console.log('Your extension ID is:');
      console.log(result.id);
    } else {
      console.error('Your add-on could not be signed!');
      console.error('Error code: ' + result.errorCode);
      console.error('Details: ' + result.errorDetails);
    }
    console.log(result.success ? 'SUCCESS' : 'FAIL');
  })
  .catch(error => {
    console.error('Signing error:', error);
  });

import path from 'path';
import fs from 'fs';
import createWebstore from 'chrome-webstore-upload';
import packageJson from '../package.json';
import loadEnv from '../loadEnv.js';
import packageNaming from '../webpack/packageNaming.js';

const { getPackagePath } = packageNaming;

loadEnv({ path: path.resolve('.') });

const { version } = packageJson;
const target = 'default';
const {
  CHROME_EXTENSION_ID,
  CHROME_CLIENT_ID,
  CHROME_CLIENT_SECRET,
  CHROME_REFRESH_TOKEN,
  NODE_ENV,
} = process.env;

const packagePath = getPackagePath(version, 'chromium', NODE_ENV);

const webStore = createWebstore({
  extensionId: CHROME_EXTENSION_ID,
  clientId: CHROME_CLIENT_ID,
  clientSecret: CHROME_CLIENT_SECRET,
  refreshToken: CHROME_REFRESH_TOKEN,
});

webStore.fetchToken().then((token) => {
  // token is a string
  const fileStream = fs.createReadStream(packagePath);
  webStore.uploadExisting(fileStream, token).then((resource) => {
    // https://developer.chrome.com/webstore/webstore_api/items#resource
    const { uploadState } = resource;
    if (uploadState === 'SUCCESS') {
      webStore.publish(target, token).then((response) => {
        // https://developer.chrome.com/webstore/webstore_api/items/publish#response
        console.log(response);
      });
    } else {
      console.log(resource);
    }
  });
});

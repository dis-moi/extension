import path from 'path';
import fs from 'fs';
import createWebstore from 'chrome-webstore-upload';
import packageJson from '../package.json';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve('.env') });

const { version } = packageJson;
const buildPath = path.resolve(
  `build/bulles-v${version}-chromium-unsigned.zip`
);
const target = 'default';
const {
  CHROME_EXTENSION_ID,
  CHROME_CLIENT_ID,
  CHROME_CLIENT_SECRET,
  CHROME_REFRESH_TOKEN
} = process.env;

const webStore = createWebstore({
  extensionId: CHROME_EXTENSION_ID,
  clientId: CHROME_CLIENT_ID,
  clientSecret: CHROME_CLIENT_SECRET,
  refreshToken: CHROME_REFRESH_TOKEN
});

webStore.fetchToken().then(token => {
  // token is a string
  const fileStream = fs.createReadStream(buildPath);
  webStore.uploadExisting(fileStream, token).then(resource => {
    // https://developer.chrome.com/webstore/webstore_api/items#resource
    const { uploadState } = resource;
    if (uploadState === 'SUCCESS') {
      webStore.publish(target, token).then(response => {
        // https://developer.chrome.com/webstore/webstore_api/items/publish#response
        console.log(response);
      });
    } else {
      console.log(resource);
    }
  });
});

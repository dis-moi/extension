import { Browser } from 'puppeteer';

const getBackgroundUrl = (extensionId: string) =>
  `chrome-extension://${extensionId}/background.html`;

export default {
  async openBackgroundPage(browser: Browser, extensionID: string) {
    const background = await browser.newPage();

    await background.goto(getBackgroundUrl(extensionID), {
      waitUntil: 'networkidle0'
    });

    return background;
  }
};

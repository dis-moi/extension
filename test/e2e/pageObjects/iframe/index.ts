import { Page, Frame } from 'puppeteer';
import expect from 'expect';
import { findIframe } from 'test/e2e/support/iframe';
import { iFrameId } from 'app/content/constants/iframe';

export const getIframe = async (page: Page): Promise<Frame> => {
  await page.waitForSelector(`iframe[id="${iFrameId}"]`);
  const frame = findIframe(page);
  expect(frame).toBeDefined();
  return frame as Frame;
};

export default {
  async waitForNotification(page: Page, delayInSeconds: number) {
    const frame = await getIframe(page);
    if (frame) {
      await frame.waitForSelector(
        `section[data-test-id="notification-container"]`,
        { timeout: delayInSeconds * 1000 }
      );
    }
    return frame;
  }
};

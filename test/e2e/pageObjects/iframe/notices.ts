import { Frame } from 'puppeteer';

const noticeTitle = "[data-test-type='noticeTitle']";

export default {
  async getNoticesTitle(frame: Frame) {
    await frame.waitForSelector(noticeTitle);
    return frame.$$(noticeTitle);
  }
};

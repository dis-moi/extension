import { Frame } from 'puppeteer';

export default {
  async getNoticesTitle(frame: Frame) {
    return (frame as Frame).$$("[data-test-type='noticeTitle']");
  }
};

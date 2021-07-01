import { Page } from 'puppeteer';
import { iFrameId } from 'app/content/constants/iframe';

export const findIframe = (page: Page) =>
  page
    .mainFrame()
    .childFrames()
    .find(frame => frame.name() === iFrameId);

import { Page } from 'puppeteer';
import { iFrameId } from 'app/constants/iframe';

export const findIframe = (page: Page) =>
  page
    .mainFrame()
    .childFrames()
    .find(frame => frame.name() === iFrameId);

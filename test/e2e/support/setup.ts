import {
  After,
  Before,
  setDefaultTimeout,
  Status,
  World
} from '@cucumber/cucumber';
import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';

setDefaultTimeout(60 * 1000);

const CRX_PATH = path.resolve(
  process.cwd(),
  'build',
  'development',
  'chromium'
);

const config = {
  screenshotPath: path.resolve(process.cwd(), 'test', 'screenshots')
};

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export interface DisMoiWorld extends World {
  browser?: Browser;
  page?: Page;
  extensionId?: string;
}

export interface InitializedDisMoiWorld extends DisMoiWorld {
  browser: Browser;
  page: Page;
  extensionId: string;
}

export const getExtensionId = async (browser: Browser) => {
  const targets = await browser.targets();

  const extensionTarget = targets.find(target => {
    return target.type() === 'background_page';
  }) as puppeteer.Target;

  return extensionTarget.url().split('/')[2];
};

Before(async function(this: DisMoiWorld) {
  this.browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--load-extension=${CRX_PATH}`,
      `--disable-extensions-except=${CRX_PATH}`
    ],
    ignoreHTTPSErrors: true
  });

  await delay(3000);

  this.extensionId = await getExtensionId(this.browser);
});

After(async function(this: DisMoiWorld, scenario) {
  if (
    scenario.result &&
    scenario.pickle.name &&
    scenario.result.status === Status.FAILED &&
    this.page
  ) {
    const screenShotName = scenario.pickle.name.replace(/[\W_]+/g, '-');
    await this.page.screenshot({
      path: `${config.screenshotPath}/error/${screenShotName}.png`
    });
  }
});

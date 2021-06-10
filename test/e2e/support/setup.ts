import {
  After,
  Before,
  setDefaultTimeout,
  Status,
  World
} from '@cucumber/cucumber';
import puppeteer, { Browser, ConsoleMessage, Page } from 'puppeteer';
import path from 'path';
import expect from 'expect';
import * as fs from 'fs';

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

type ConsoleType = 'profiles' | 'background' | 'contentScript';

export interface DisMoiWorld extends World {
  browser?: Browser;
  page?: Page;
  extensionId?: string;
  consoleMessages?: [ConsoleType, string][];
}

export interface InitializedDisMoiWorld extends DisMoiWorld {
  browser: Browser;
  page: Page;
  extensionId: string;
  consoleMessages: [ConsoleType, string][];
}

const startChromium = async () => {
  try {
    return await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        // '--disable-dev-shm-usage',
        `--load-extension=${CRX_PATH}`,
        `--disable-extensions-except=${CRX_PATH}`,
        '--enable-automation'
      ],
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--disable-extensions']
    });
  } catch (e) {
    console.error('Could not start Chromium', e, e.stack);
  }
};

const getExtensionId = async (world: DisMoiWorld) => {
  try {
    const targets = await world.browser?.targets();

    if (!targets) return;

    const extensionTarget = targets.find(target => {
      return target.type() === 'background_page';
    }) as puppeteer.Target;

    const p = (await extensionTarget.page()) as Page;

    p.on('console', (consoleMessage: ConsoleMessage) => {
      if (world.consoleMessages) {
        world.consoleMessages.push(['background', consoleMessage.text()]);
      }
    });

    const id = extensionTarget.url().split('/')[2];

    console.log(`Extension ID: ${id}`);

    return id;
  } catch (e) {
    console.error('Could not get extension ID', e, e.stack);
  }
};

const waitForOnboarding = async (browser: Browser) => {
  await browser.waitForTarget(target => target.url().includes('localhost'));
};

const closeEmptyTab = async (browser: Browser) => {
  const targets = await browser.targets();
  const blank = targets.find(target => target.url() === 'about:blank');
  if (blank) {
    await (await blank.page())?.close();
  }
};

Before(async function(this: DisMoiWorld) {
  if (fs.existsSync(config.screenshotPath)) {
    fs.rmdirSync(config.screenshotPath, { recursive: true });
  }
  fs.mkdirSync(config.screenshotPath, { recursive: true });

  this.consoleMessages = [];

  const browser = await startChromium();

  expect(browser).toBeDefined();
  this.browser = browser as Browser;

  const extensionId = await getExtensionId(this);

  expect(extensionId).toBeDefined();
  this.browser = browser as Browser;

  await waitForOnboarding(browser as Browser);
  await closeEmptyTab(browser as Browser);
});

After(async function(this: DisMoiWorld, scenario) {
  if (
    scenario.result &&
    scenario.pickle.name &&
    scenario.result.status === Status.FAILED
  ) {
    if (this.consoleMessages) {
      this.consoleMessages.forEach(([type, message]) => {
        console.log(type, message);
      });
    }

    if (this.page) {
      const screenShotName = scenario.pickle.name.replace(/[\W_]+/g, '-');
      await this.page.screenshot({
        path: `${config.screenshotPath}/${screenShotName}.png`
      });
    }
  }
});

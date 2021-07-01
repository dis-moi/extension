import { ConsoleMessage, Page } from 'puppeteer';
import { InitializedDisMoiWorld } from 'test/e2e/support/setup';

const profilesHost = 'http://localhost:8080';
const profilesUrl = `${profilesHost}/eclaireurs`;

const contributorCard = (contributorName?: string) =>
  `[data-test-type="contributor-card"]${
    contributorName ? `[data-test-contributor-name="${contributorName}"]` : ''
  }`;
const contributorCardTitleLink = (contributorName?: string) =>
  `${contributorCard(
    contributorName
  )} [data-test-type="contributor-name-link"]`;
const contributorButton = (contributorName?: string) =>
  `${contributorCard(contributorName)} [data-test-type="contributor-button"]`;

const getProfilesPage = async (world: InitializedDisMoiWorld) => {
  const pages = await world.browser.pages();
  const existing = pages.find(page => page.url().includes(profilesHost));
  if (existing) {
    existing.on('console', (consoleMessage: ConsoleMessage) => {
      world.consoleMessages.push(['profiles', consoleMessage.text()]);
    });

    return existing;
  }
  const page = await world.browser.newPage();
  await page.goto(profilesUrl);
  page.on('console', (consoleMessage: ConsoleMessage) => {
    console.warn('profiles', consoleMessage.text());
  });
  return page;
};

export default {
  async getContributorsList(world: InitializedDisMoiWorld) {
    const page = await getProfilesPage(world);
    await page.goto(profilesUrl);
    await page.waitForSelector(contributorCard());
    return page;
  },
  async clickContributorName(page: Page, contributorName: string) {
    await page.click(
      `${contributorCard(contributorCardTitleLink(contributorName))} a`
    );
  },
  async clickContributorButton(page: Page, contributorName: string) {
    await page.click(contributorButton(contributorName));
  },
  async expectContributorIsFollowed(page: Page, contributorName: string) {
    await page.waitForFunction(
      `document.querySelector('${contributorButton(
        contributorName
      )}').innerText !== 'Suivre'`
    );
  }
};

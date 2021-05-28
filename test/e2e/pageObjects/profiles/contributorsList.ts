import { Browser, Page } from 'puppeteer';

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

const getProfilesPage = async (browser: Browser) => {
  const pages = await browser.pages();
  const existing = pages.find(page => page.url().includes(profilesHost));
  if (existing) return existing;
  const page = await browser.newPage();
  await page.goto(profilesUrl);
  return page;
};

export default {
  async getContributorsList(browser: Browser) {
    const page = await getProfilesPage(browser);
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
    await page.click(
      `${contributorCard(
        contributorName
      )} [data-test-type="contributor-button"]`
    );
  }
};

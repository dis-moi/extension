import { Page } from 'puppeteer';

const profilesUrl = 'http://localhost:8080/eclaireurs';

const selectors = {
  contributorProfileListItem: '[data-test-type="contributor-profile-list-item"]'
};
const xpaths = {
  contributorItemInProfileList: async (contributorName: string) =>
    `//[@data-test-type='contributor-profile-list-item']/[normalize-space() = 'Maarten']`
};

export default {
  async goToContributorsList(page: Page) {
    await page.goto(profilesUrl);
    await page.waitForSelector(selectors.contributorProfileListItem);
  },
  async clickContributor(page: Page, contributorName: string) {
    const elements = await page.$x(`${selectors}`);
    await page.click(`${selectors.contributorProfileListItem} a`);
  }
};

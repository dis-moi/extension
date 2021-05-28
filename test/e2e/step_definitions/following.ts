import expect from 'expect';
import { Given } from '@cucumber/cucumber';
import { InitializedDisMoiWorld } from '../support/setup';
import Profiles from '../pageObjects/profiles';

Given(/^I am following"(.+)"$/, async function(
  this: InitializedDisMoiWorld,
  contributorName: string
) {
  let error = null;
  try {
    await Profiles.goToContributorsList(await this.browser.newPage());
    await Profiles.clickContributor(contributorName);
  } catch (e) {
    error = e;
  }

  expect(error).toBeNull();
});

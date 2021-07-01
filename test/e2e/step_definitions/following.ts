import { Given } from '@cucumber/cucumber';
import { InitializedDisMoiWorld } from '../support/setup';
import Profiles from '../pageObjects/profiles/contributorsList';

Given(/^I am following "(.+)"$/, async function(
  this: InitializedDisMoiWorld,
  contributorName: string
) {
  this.page = await Profiles.getContributorsList(this);
  await Profiles.clickContributorButton(this.page, contributorName);
  await Profiles.expectContributorIsFollowed(this.page, contributorName);
});

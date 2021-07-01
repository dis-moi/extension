import { Then } from '@cucumber/cucumber';
import expect from 'expect';
import { InitializedDisMoiWorld } from '../support/setup';
import Iframe from '../pageObjects/iframe';

Then(/^I see the notification within (\d+) seconds$/, async function(
  this: InitializedDisMoiWorld,
  delay: number
) {
  let error = null;
  try {
    await Iframe.waitForNotification(this.page, delay);
  } catch (e) {
    error = e;
  }

  expect(error).toBeNull();
});

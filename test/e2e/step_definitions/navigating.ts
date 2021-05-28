import expect from 'expect';
import { When } from '@cucumber/cucumber';
import { InitializedDisMoiWorld } from '../support/setup';

When(/^I open the url "(.+)"$/, async function(
  this: InitializedDisMoiWorld,
  url: string
) {
  let error = null;
  try {
    await this.page.goto(url, {
      waitUntil: 'networkidle0'
    });
  } catch (e) {
    error = e;
  }

  expect(error).toBeNull();
});

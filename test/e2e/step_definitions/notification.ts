import { Then } from '@cucumber/cucumber';
import { InitializedDisMoiWorld } from '../support/setup';
import expect from 'expect';
import { findIframe } from '../support/iframe';

Then(/^I see the notification within (\d+) seconds$/, async function(
  this: InitializedDisMoiWorld,
  delay: number
) {
  let error = null;
  try {
    const frame = findIframe(this.page);
    expect(frame).toBeDefined();

    if (frame) {
      await frame.waitForSelector(
        `section[data-test-id="notification-container"]`,
        { timeout: delay * 1000 }
      );
    }
  } catch (e) {
    error = e;
  }

  expect(error).toBeNull();
});

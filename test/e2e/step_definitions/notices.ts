import { Then } from '@cucumber/cucumber';
import { InitializedDisMoiWorld } from '../support/setup';
import expect from 'expect';
import { findIframe } from '../support/iframe';

Then(/^The first notice has text "(.+)"$/, async function(
  this: InitializedDisMoiWorld,
  text: string
) {
  let error = null;
  try {
    const frame = findIframe(this.page);
    expect(frame).toBeDefined();

    if (frame) {
      const firstNoticeP = await frame.$(
        "article p[data-test-type='noticeTitle']"
      );
      expect(firstNoticeP).toBeDefined();

      if (firstNoticeP) {
        const firstNoticeText = await frame.evaluate(
          e => e.textContent,
          firstNoticeP
        );
        expect(firstNoticeText).toMatch(new RegExp(`^${text}`));
      }
    }
  } catch (e) {
    error = e;
  }

  expect(error).toBeNull();
});

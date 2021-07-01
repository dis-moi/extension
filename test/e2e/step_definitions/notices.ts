import { Then } from '@cucumber/cucumber';
import expect from 'expect';
import { InitializedDisMoiWorld } from '../support/setup';
import IframeNotices from '../pageObjects/iframe/notices';
import { getIframe } from 'test/e2e/pageObjects/iframe';

Then(/^The first notice has text "(.+)"$/, async function(
  this: InitializedDisMoiWorld,
  text: string
) {
  const notification = await getIframe(this.page);

  const noticesTitles = await IframeNotices.getNoticesTitle(notification);

  expect(noticesTitles[0]).toBeDefined();

  const firstNoticeText = await noticesTitles[0].evaluate(e => e.textContent);

  expect(firstNoticeText).toMatch(new RegExp(`^${text}`));
});

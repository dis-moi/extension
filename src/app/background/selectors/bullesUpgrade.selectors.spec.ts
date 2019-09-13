import { BackgroundState } from '../reducers';
import { expect } from 'chai';
import { getUpgradeMessageLastShowDate } from './bullesUpgrade.selectors';

describe('background > selectors > bullesUpgrade', () => {
  describe('getUpgradeMessageLastShowDate', () => {
    it("returns the message's last date", () => {
      const someDay = new Date('2019-09-13');
      const state: BackgroundState = {
        tabs: {},
        installationDetails: {
          version: '',
          reason: 'INSTALL'
        },
        prefs: {
          likedNotices: [],
          dislikedNotices: [],
          dismissedNotices: [],
          markedReadNotices: [],
          tosAccepted: true
        },
        resources: {
          matchingContexts: [],
          drafts: [],
          contributors: []
        },
        subscriptions: [],
        bullesUpgrade: { lastServiceMessageShowDate: someDay }
      };
      expect(getUpgradeMessageLastShowDate(state)).to.eql(someDay);
    });
  });
});

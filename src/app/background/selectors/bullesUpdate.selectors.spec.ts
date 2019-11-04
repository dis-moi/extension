import { BackgroundState } from '../reducers';
import { expect } from 'chai';
import { getUpdateMessageLastShowDate } from './bullesUpdate.selectors';

describe('background > selectors > bullesUpdate', () => {
  describe('getUpdateMessageLastShowDate', () => {
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
          readNotices: [],
          tosAccepted: true
        },
        resources: {
          matchingContexts: [],
          drafts: [],
          contributors: []
        },
        subscriptions: [],
        bullesUpdate: { lastUpdateMessageShowDate: someDay }
      };
      expect(getUpdateMessageLastShowDate(state)).to.eql(someDay);
    });
  });
});

import { expect } from 'chai';
import { StateV3 } from './StateV3';
import { migration4 } from './4.2019-08-28';

describe('migrations/4', () => {
  describe('if previous state has `readNotices` key', () => {
    const storeV3: StateV3 = {
      prefs: {
        // @ts-ignore
        installationDetails: {
          datetime: new Date(),
          version: '1'
        },
        likedNotices: [],
        dislikedNotices: [],
        dismissedNotices: [],
        readNotices: [1, 42]
      }
    };

    const migratedStore = migration4(storeV3);

    it('removes the `readNotices` keys', () => {
      expect(migratedStore).to.not.have.nested.property('prefs.readNotices');
    });
    it('keeps old `readNotices` data in `markedReadNotices` key', () => {
      expect(migratedStore)
        .to.have.nested.property('prefs.markedReadNotices')
        .that.eql([1, 42]);
    });
  });
  describe("if previous state doesn't have `readNotices` key", () => {
    const storeV3: StateV3 = {
      prefs: {
        // @ts-ignore
        installationDetails: {
          datetime: new Date(),
          version: '1'
        },
        likedNotices: [],
        dislikedNotices: [],
        dismissedNotices: []
      }
    };

    const migratedStore = migration4(storeV3);

    it('does nothing', () => {
      expect(migratedStore).to.eql(storeV3);
    });
  });
});

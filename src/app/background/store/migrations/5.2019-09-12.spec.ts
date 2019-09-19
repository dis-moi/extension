import { expect } from 'chai';
import { migration5 } from './5.2019-09-12';
import { StateV4 } from './StateV4';

describe('migrations/5', () => {
  describe('if previous state has `markedReadNotices` key', () => {
    const storeV4: StateV4 = {
      prefs: {
        installationDetails: {
          datetime: new Date(),
          version: '1'
        },
        likedNotices: [],
        dislikedNotices: [],
        dismissedNotices: [],
        markedReadNotices: [1, 42]
      }
    };

    const migratedStore = migration5(storeV4);

    it('removes the `readNotices` keys', () => {
      expect(migratedStore).to.not.have.nested.property(
        'prefs.markedReadNotices'
      );
    });
    it('keeps old `markedReadNotices` data in `readNotices` key', () => {
      expect(migratedStore)
        .to.have.nested.property('prefs.readNotices')
        .that.eql([1, 42]);
    });
  });
  describe("if previous state doesn't have `markedReadNotices` key", () => {
    const storeV4: StateV4 = {
      prefs: {
        installationDetails: {
          datetime: new Date(),
          version: '1'
        },
        likedNotices: [],
        dislikedNotices: [],
        dismissedNotices: []
      }
    };

    const migratedStore = migration5(storeV4);

    it('does nothing', () => {
      expect(migratedStore).to.eql(storeV4);
    });
  });
});

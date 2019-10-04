/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import {
  areTosAccepted,
  getDisliked,
  getDismissed,
  getLiked,
  getRead,
  StateWithPrefs
} from './prefs.selectors';
import { PrefsState } from '../reducers/prefs.reducer';

const emptyState: StateWithPrefs = {
  prefs: {
    readNotices: [],
    likedNotices: [],
    dismissedNotices: [],
    dislikedNotices: [],
    tosAccepted: false
  }
};

const getPrefsStateWith = (prefs: Partial<PrefsState>): StateWithPrefs => ({
  prefs: { ...emptyState.prefs, ...prefs }
});

describe('background > selectors > prefs', () => {
  describe('areTosAccepted', () => {
    it('returns false if TOS have not been accepted', () => {
      expect(areTosAccepted(getPrefsStateWith({ tosAccepted: false }))).to.be
        .false;
    });
    it('returns true if TOS have been accepted', () => {
      expect(areTosAccepted(getPrefsStateWith({ tosAccepted: true }))).to.be
        .true;
    });
  });
  describe('getDismissed', () => {
    it('returns list of ids of dismissed notices', () => {
      expect(
        getDismissed(getPrefsStateWith({ dismissedNotices: [1, 2, 3] }))
      ).to.eql([1, 2, 3]);
    });
  });
  describe('getLiked', () => {
    it('returns list of ids of liked notices', () => {
      expect(getLiked(getPrefsStateWith({ likedNotices: [1, 2, 3] }))).to.eql([
        1,
        2,
        3
      ]);
    });
  });
  describe('getDisliked', () => {
    it('returns list of ids of disliked notices', () => {
      expect(
        getDisliked(getPrefsStateWith({ dislikedNotices: [1, 2, 3] }))
      ).to.eql([1, 2, 3]);
    });
  });
  describe('getRead', () => {
    it('returns list of ids of read notices', () => {
      expect(getRead(getPrefsStateWith({ readNotices: [1, 2, 3] }))).to.eql([
        1,
        2,
        3
      ]);
    });
  });
});

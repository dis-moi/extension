import { expect } from 'chai';
import prefsReducer from 'apps/extension/src/apps/background/reducers/prefs.reducer';
import {
  dismissNotice,
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  undismissNotice,
  markNoticeRead
} from 'libs/store/actions/notices';

describe('prefsReducer reducer', function() {
  it('dismiss notice', () => {
    const action = dismissNotice(1);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.dismissedNotices).to.have.lengthOf(1);
  });

  it('like notice', () => {
    const action = likeNotice(1);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.likedNotices).to.have.lengthOf(1);
  });

  it('dislike notice', () => {
    const action = dislikeNotice(1);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.dislikedNotices).to.have.lengthOf(1);
  });

  it('undismiss notice', () => {
    const action = undismissNotice(42);

    const nextState = prefsReducer(
      {
        dismissedNotices: [42],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.dismissedNotices).to.have.lengthOf(0);
  });

  it('unlike notice', () => {
    const action = unlikeNotice(42);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [42],
        dislikedNotices: [],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.likedNotices).to.have.lengthOf(0);
  });

  it('undislike notice', () => {
    const action = undislikeNotice(42);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [42],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.dislikedNotices).to.have.lengthOf(0);
  });

  it('read notice', () => {
    const action = markNoticeRead(42);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
        tosAccepted: true
      },
      action
    );

    expect(nextState.readNotices).to.have.lengthOf(1);
    expect(nextState.readNotices[0]).to.equal(42);
  });
});

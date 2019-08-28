import chai from 'chai';
import prefsReducer from 'app/background/reducers/prefs.reducer';
import resourcesReducer from 'app/background/reducers/resources.reducer';
import { receivedMatchingContexts } from 'app/src/app/actions/refreshMatchingContexts';
import {
  dismissNotice,
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  undismissNotice,
  markNoticeRead
} from 'app/actions/notices';
import { MatchingContext } from 'app/lmem/matchingContext';

const expect = chai.expect;

describe('prefsReducer reducer', function() {
  const installationDetails = { version: '0.1', reason: 'install' };

  it('dismiss notice', () => {
    const action = dismissNotice(1);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        markedReadNotices: [],
        installationDetails,
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
        markedReadNotices: [],
        installationDetails
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
        markedReadNotices: [],
        installationDetails
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
        markedReadNotices: [],
        installationDetails
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
        markedReadNotices: [],
        installationDetails
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
        markedReadNotices: [],
        installationDetails
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
        markedReadNotices: [],
        installationDetails
      },
      action
    );

    expect(nextState.markedReadNotices).to.have.lengthOf(1);
    expect(nextState.markedReadNotices[0]).to.equal(42);
  });
});

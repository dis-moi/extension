import chai from 'chai';
import prefsReducer from '../../src/app/background/reducers/prefs';
import resourcesReducer from '../../src/app/background/reducers/resources';
import { receivedMatchingContexts } from '../../src/app/actions/refreshMatchingContexts';
import {
  dismissNotice,
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  undismissNotice,
  markNoticeRead
} from '../../src/app/actions/notices';
import { MatchingContext } from '../../src/app/lmem/matchingContext';

const expect = chai.expect;

describe('background reducer', function() {
  it('initial state + receivedMatchingContexts => state with offers', () => {
    const matchingContexts: MatchingContext[] = [
      { noticeUrl: 'http://1', urlRegex: '/1/', noticeId: 42 },
      { noticeUrl: 'http://2', urlRegex: '/2/', noticeId: 42 }
    ];
    const action = receivedMatchingContexts(matchingContexts);

    const nextState = resourcesReducer(undefined, action);

    expect(nextState.matchingContexts).to.have.lengthOf(
      matchingContexts.length
    );
  });

  it('dismiss notice', () => {
    const action = dismissNotice(1);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        markedReadNotices: [],
        installationDetails: { version: '0.1' }
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
        installationDetails: { version: '0.1' }
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
        installationDetails: { version: '0.1' }
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
        installationDetails: { version: '0.1' }
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
        installationDetails: { version: '0.1' }
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
        installationDetails: { version: '0.1' }
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
        installationDetails: { version: '0.1' }
      },
      action
    );

    expect(nextState.markedReadNotices).to.have.lengthOf(1);
    expect(nextState.markedReadNotices[0]).to.equal(42);
  });
});

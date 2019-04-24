import chai from 'chai';

import prefsReducer from '../../src/app/background/reducers/prefs';
import resourcesReducer from '../../src/app/background/reducers/resources';
import { receivedMatchingContexts } from '../../src/app/actions/kraftBackend';
import {
  dismissNotice,
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  undismissNotice
} from '../../src/app/actions/recommendations';
import { MatchingContext } from '../../src/app/lmem/matchingContext';

const expect = chai.expect;

describe('background reducer', function() {
  it('initial state + receivedMatchingContexts => state with offers', () => {
    const matchingContexts: MatchingContext[] = [
      { recommendation_url: 'http://1', url_regex: '/1/' },
      { recommendation_url: 'http://2', url_regex: '/2/' }
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
        installationDetails: { version: '0.1' }
      },
      action
    );

    expect(nextState.dislikedNotices).to.have.lengthOf(0);
  });
});

import chai from 'chai';
import prefsReducer from '../../src/app/background/reducers/prefs.reducer';
import resourcesReducer from '../../src/app/background/reducers/resources.reducer';
import { receivedMatchingContexts } from '../../src/app/actions/refreshMatchingContexts';
import {
  dismissNotice,
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  undismissNotice,
  readNotice
} from '../../src/app/actions/notices';
import { MatchingContext } from '../../src/app/lmem/matchingContext';

const expect = chai.expect;

describe('prefsReducer reducer', function() {
  it('dismiss notice', () => {
    const action = dismissNotice(1);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
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
        readNotices: [],
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
        readNotices: [],
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
        readNotices: [],
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
        readNotices: [],
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
        readNotices: [],
        installationDetails: { version: '0.1' }
      },
      action
    );

    expect(nextState.dislikedNotices).to.have.lengthOf(0);
  });

  it('read notice', () => {
    const action = readNotice(42);

    const nextState = prefsReducer(
      {
        dismissedNotices: [],
        likedNotices: [],
        dislikedNotices: [],
        readNotices: [],
        installationDetails: { version: '0.1' }
      },
      action
    );

    expect(nextState.readNotices).to.have.lengthOf(1);
    expect(nextState.readNotices[0]).to.equal(42);
  });
});

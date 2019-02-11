import chai from 'chai';
const expect = chai.expect;

import fromJS from '../../../src/app/utils/customFromJS';

import migrate from '../../../src/app/background/store/migrations';
import makeInitialState from '../../../src/app/background/store/makeInitialState';

describe('migrate', function () {
  it('should create a Map with basic fields if no loaded state', function () {

    const initialState = fromJS({
      prefs: {
        websites: undefined,
      }
    });

    expect(migrate(undefined, initialState)).to.deep.equal(initialState);
  });

  it('should create a Map with values from loaded state', function () {

    const initialState = makeInitialState();

    const loadedState = fromJS({
      websites: 1,
      prefs: {
        criteria: 2
      }
    });

    expect(migrate(loadedState, initialState).getIn(['prefs', 'websites'])).to.equal(1);
    expect(migrate(loadedState, initialState).getIn(['prefs', 'criteria'])).to.equal(2);
    expect(migrate(loadedState, initialState).getIn(['prefs', 'editors']))
    .to.deep.equal(initialState.getIn(['prefs', 'editors']));
    expect(migrate(loadedState, initialState).getIn(['prefs', 'dismissedRecos']))
    .to.deep.equal(initialState.getIn(['prefs', 'dismissedRecos']));
    expect(migrate(loadedState, initialState).getIn(['prefs', 'approvedRecos']))
    .to.deep.equal(initialState.getIn(['prefs', 'approvedRecos']));
    expect(migrate(loadedState, initialState).getIn(['prefs', 'onInstalledDetails']))
    .to.deep.equal(initialState.getIn(['prefs', 'onInstalledDetails']));
  });

  it('copies approvedRecos to likedNotices', function () {
    const initialState = makeInitialState();

    const previouslyLikedNotices = ['some', 'ids'];

    const loadedState = fromJS({
      prefs: {
        approvedRecos: previouslyLikedNotices
      }
    });

    const migratedState = migrate(loadedState, initialState);

    expect(migratedState.getIn(['prefs', 'likedNotices'])).to.include('some');
  });
  it('initialize dislikedNotices if not existent', function () {
    const initialState = makeInitialState();

    const loadedState = fromJS({
      prefs: {}
    });

    const migratedState = migrate(loadedState, initialState);

    expect(migratedState.getIn(['prefs', 'dislikedNotices'])).to.exist
  });
});

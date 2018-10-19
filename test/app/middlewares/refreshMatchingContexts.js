import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import refreshMatchingContexts from '../../../src/app/background/middlewares/refreshMatchingContexts';
import {
  REFRESH_MATCHING_CONTEXTS,
  EXCLUDE_EDITOR, INCLUDE_EDITOR,
  SELECT_CRITERION, UNSELECT_CRITERION,
} from '../../../src/app/constants/ActionTypes';

const expect = chai.expect;
chai.use(sinonChai);

function create() {
  const store = {
    getState: sinon.fake.returns({}),
    dispatch: sinon.fake(),
  };
  const next = sinon.fake();

  const invoke = action => refreshMatchingContexts(store)(next)(action);

  return {store, next, invoke};
}

describe('Refresh Matching Contexts Middleware', () => {

  function expectBoilerplate(actionType) {
    const { next, invoke, store } = create();
    const action = { type: actionType };
    invoke(action);
    expect(store.dispatch).to.have.been.calledAfter(next);
    expect(next).to.have.been.calledWith(action);
    expect(store.dispatch).to.have.been.calledWith({ type: REFRESH_MATCHING_CONTEXTS });
  }

  describe('on criteria unselection', () => {
    it('updates matching contexts afterwards', () => {
      expectBoilerplate(UNSELECT_CRITERION);
    });
  });

  describe('on criteria selection', () => {
    it('updates matching contexts afterwards', () => {
      expectBoilerplate(SELECT_CRITERION);
    });
  });

  describe('on editors exclusion', () => {
    it('updates matching contexts afterwards', () => {
      expectBoilerplate(EXCLUDE_EDITOR);
    });
  });

  describe('on editors inclusion', () => {
    it('updates matching contexts afterwards', () => {
      expectBoilerplate(INCLUDE_EDITOR);
    });
  });

});
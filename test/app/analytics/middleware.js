import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import middleware from '../../../src/app/background/middlewares/analytics';
import { POPUP_CLICK } from '../../../src/app/constants/ActionTypes';

const expect = chai.expect;
chai.use(sinonChai);


function create() {
  const store = {
    getState: sinon.stub().returns({}),
    dispatch: sinon.stub(),
  };
  const next = sinon.stub();
  const track = sinon.stub();

  const invoke = action => middleware({
    getCurrentTabs: () => Promise.resolve([{url: 'https://lmem.net'}]),
    track,
  })(store)(next)(action);

  return {store, next, track, invoke};
}

describe('Analytics middleware', () => {

  it('passes through api actions', () => {
    const { next, invoke } = create();
    const action = { type: 'api/bypass' };
    invoke(action);
    expect(next).to.have.been.calledWith(action)
  });

  it('passes through persist actions', () => {
    const { next, invoke } = create();
    const action = { type: 'persist/bypass' };
    invoke(action);
    expect(next).to.have.been.calledWith(action)
  });

  it('tracks actions', () => {
    const { track, invoke } = create();
    const action = { type: 'gothroughthisone' };
    invoke(action);
    expect(track).to.have.been.calledWith(action);
  });

  it('tracks actions with current tab url on POPUP', (done) => {
    const { track, invoke } = create();
    const action = { type: POPUP_CLICK };
    invoke(action);

    // next tick
    setTimeout(() => {
      expect(track).to.have.been.calledWith({ type: POPUP_CLICK, currentHref: 'https://lmem.net' });
      done();
    }, 0)
  });

});

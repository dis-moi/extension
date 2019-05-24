import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Action } from 'redux';
import middleware from '../../../src/app/background/middlewares/analytics';
import { close } from '../../../src/app/actions/ui';
import {
  readNotice,
  resourceLinkClicked
} from '../../../src/app/actions/notices';

const expect = chai.expect;
chai.use(sinonChai);

function create() {
  const next = sinon.stub();
  const track = sinon.stub();

  const invoke = (action: Action) => middleware(track)()(next)(action);

  return { next, track, invoke };
}

describe('Analytics middleware', () => {
  it('passes through api actions', () => {
    const { next, invoke } = create();
    const action = { type: 'api/bypass' };
    invoke(action);
    expect(next).to.have.been.calledWith(action);
  });

  it('passes through persist actions', () => {
    const { next, invoke } = create();
    const action = { type: 'persist/bypass' };
    invoke(action);
    expect(next).to.have.been.calledWith(action);
  });

  it("does'nt track actions with a `tracked` meta set to `false`", () => {
    const { next, invoke } = create();
    const action = { type: 'doNotTrackMeEither', meta: { tracked: false } };
    invoke(action);
    expect(next).to.have.been.calledWith(action);
  });

  it('tracks actions', () => {
    const { track, invoke } = create();
    const action = { type: 'gothroughthisone' };
    invoke(action);
    expect(track).to.have.been.calledWith(action);
  });

  it('tracks close action', () => {
    const { track, invoke } = create();
    const action = close();
    invoke(action);
    expect(track).to.have.been.calledWith(action);
  });

  it('tracks read notice action', () => {
    const { track, invoke } = create();
    const action = readNotice(1);
    invoke(action);
    expect(track).to.have.been.calledWith(action);
  });

  it('tracks resource link clicked action', () => {
    const { track, invoke } = create();
    const action = resourceLinkClicked(1);
    invoke(action);
    expect(track).to.have.been.calledWith(action);
  });
});

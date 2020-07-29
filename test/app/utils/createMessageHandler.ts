import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

// @ts-ignore
global.browser = { extension: { getURL: () => 'options.html' } };

import { noticesFound } from 'app/actions/notices';
import createMessageHandler from 'webext/createMessageHandler';
import { getOptionsUrl } from 'webext/openOptionsTab';

const expect = chai.expect;
chai.use(sinonChai);

describe('createMessageHandler', () => {
  it('emits INVALID_ACTION if received an invalid action', () => {
    const emit = sinon.fake();
    const handleMessage = createMessageHandler(emit);
    const action = { test: 'test' };
    const sender = {
      id: 'extensionId'
    };

    handleMessage(action, sender);

    expect(emit).to.have.been.calledWithMatch({
      type: `INVALID_ACTION`,
      // We should assert the payload shape : new Error(`Received invalid action from background`),
      error: true,
      meta: { action, fromText: 'background' }
    });
  });

  it('emits the valid action with meta.from content added', () => {
    const emit = sinon.fake();
    const handleMessage = createMessageHandler(emit);
    const action = noticesFound([], { id: 1, url: '' });
    const sender = {
      id: 'extensionId',
      tab: {
        url: 'somePage.html'
      }
    };

    // @ts-ignore
    handleMessage(action, sender);

    expect(emit).to.have.been.calledWith({
      ...action,
      meta: {
        tab: { id: 1, url: '' },
        from: 'content'
      }
    });
  });

  it('emits the valid action with meta.from options added', () => {
    const emit = sinon.fake();
    const handleMessage = createMessageHandler(emit);
    const action = noticesFound([], { id: 1, url: '' });
    const sender = {
      id: 'extensionId',
      tab: {
        url: getOptionsUrl(),
      }
    };

    // @ts-ignore
    handleMessage(action, sender);

    expect(emit).to.have.been.calledWith({
      ...action,
      meta: {
        tab: { id: 1, url: '' },
        from: 'options'
      }
    });
  });
});

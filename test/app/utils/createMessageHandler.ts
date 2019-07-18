import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import createMessageHandler from 'app/utils/createMessageHandler';
import { noticesFound } from 'app/actions/notices';

const expect = chai.expect;
chai.use(sinonChai);

describe('createMessageHandler', () => {
  const emit = sinon.fake();
  const sendResponse = sinon.fake();
  const handleMessage = createMessageHandler(emit);
  it('should not forward to the app an invalid action', () => {
    const action = { test: 'test' };
    const sender = {
      id: 'extensionId'
    };

    handleMessage(action, sender, sendResponse);

    expect(emit).to.not.have.been.called;
    expect(sendResponse).to.have.been.called;
  });

  it('should forward to the app a valid action', () => {
    const handleMessage = createMessageHandler(emit);
    const action = noticesFound([], { id: 1, url: '' });
    const sender = {
      id: 'extensionId'
    };

    handleMessage(action, sender, sendResponse);

    expect(emit).to.have.been.called;
  });
});

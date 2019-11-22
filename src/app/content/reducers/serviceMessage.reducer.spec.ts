/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';
import { CloseCause } from 'app/lmem/ui';
import { closed, showServiceMessage } from 'app/actions';

describe('content > reducers > serviceMessage', () => {
  it('initialize to null', () => {
    expect(
      // @ts-ignore
      serviceMessage(undefined, { type: 'UNKNOWN' })
    ).to.have.property('serviceMessage', null);
  });
  it('shows update message when receive SHOW_SERVICE_MESSAGE', () => {
    const state: ServiceMessageState = {
      serviceMessage: null,
      action: null
    };
    expect(
      serviceMessage(state, showServiceMessage('message', { id: 1, url: '' }))
    ).to.have.property('serviceMessage', 'message');
  });
  it('removes the update message when UI is CLOSED', () => {
    const state: ServiceMessageState = {
      serviceMessage: null,
      action: null
    };
    expect(
      serviceMessage(state, closed(CloseCause.CloseButton))
    ).to.have.property('serviceMessage', null);
  });
});

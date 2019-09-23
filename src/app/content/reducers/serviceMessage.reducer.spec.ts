/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';
import { CloseCause } from 'app/lmem/ui';
import { closed, showBullesUpdateMessage } from 'app/actions';

describe('content > reducers > serviceMessage', () => {
  it('initialize to false', () => {
    expect(
      // @ts-ignore
      serviceMessage(undefined, { type: 'UNKNOWN' })
    ).to.have.property('showUpdateMessage', false);
  });
  it('shows update message when receive SHOW_BULLES_UPDATE_SERVICE_MESSAGE', () => {
    const state: ServiceMessageState = {
      showUpdateMessage: false
    };
    expect(
      serviceMessage(state, showBullesUpdateMessage({ id: 1, url: '' }))
    ).to.have.property('showUpdateMessage', true);
  });
  it('removes the update message when UI is CLOSED', () => {
    const state: ServiceMessageState = {
      showUpdateMessage: true
    };
    expect(
      serviceMessage(state, closed(CloseCause.CloseButton))
    ).to.have.property('showUpdateMessage', false);
  });
});

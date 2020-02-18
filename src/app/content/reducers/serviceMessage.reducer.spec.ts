/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';
import { clearServiceMessage, showServiceMessage } from 'app/actions';

describe('content > reducers > serviceMessage', () => {
  it('initialize to []', () => {
    expect(
      // @ts-ignore
      serviceMessage(undefined, { type: 'UNKNOWN' })
    ).to.have.deep.property('messages', []);
  });
  it('shows update message when receive SERVICE_MESSAGE', () => {
    const state: ServiceMessageState = {
      messages: []
    };
    expect(
      serviceMessage(
        state,
        showServiceMessage({ messages: ['message'] }, { id: 1, url: '' })
      )
    ).to.have.deep.property('messages', ['message']);
  });
  it('removes the update message when UI is CLOSED', () => {
    const state: ServiceMessageState = {
      messages: ['Update required!']
    };
    expect(
      serviceMessage(state, clearServiceMessage({ id: 1, url: '' }))
    ).to.have.deep.property('messages', []);
  });
});

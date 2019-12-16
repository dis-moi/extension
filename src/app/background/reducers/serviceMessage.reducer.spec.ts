/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';
import { showServiceMessage } from 'app/actions';

describe('background > reducers > serviceMessage', () => {
  it('has null lastShownDate initially', () => {
    // @ts-ignore
    expect(serviceMessage(undefined, { type: 'UNKNOWN_ACTION' })).to.eql({
      lastShownDate: null
    });
  });
  it('saves the lastShownDate from SHOW_SERVICE_MESSAGE action', () => {
    const now = new Date();
    const clock = useFakeTimers(now.getTime());
    const action = showServiceMessage(["Hey there I'm a service message"], {
      id: 1,
      url: ''
    });
    const state: ServiceMessageState = {
      lastShownDate: null
    };
    expect(serviceMessage(state, action)).to.eql({
      lastShownDate: now
    });
    clock.restore();
  });
});

/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import serviceMessage from './serviceMessage.reducer';
import { opened, OpenFrom } from 'app/actions';

describe('background > reducers > serviceMessage', () => {
  it('saves the lastShownDate when OPENED from a service message action', () => {
    const now = new Date();
    const clock = useFakeTimers(now.getTime());
    const action = opened(OpenFrom.ServiceMessage, now);
    expect(serviceMessage(undefined, action)).to.eql({
      lastShownDate: now
    });
    clock.restore();
  });
});

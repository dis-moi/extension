/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import { opened, OpenFrom } from 'libs/store/actions';
import serviceMessage from './serviceMessage.reducer';

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

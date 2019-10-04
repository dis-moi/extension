/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import bullesUpdate, { BullesUpdateState } from './bullesUpdate.reducer';
import { showBullesUpdateMessage } from 'app/actions';

describe('background > reducers > bullesUpdate', () => {
  it('has null lastUpdateMessageShowDate initially', () => {
    // @ts-ignore
    expect(bullesUpdate(undefined, { type: 'UNKNOWN_ACTION' })).to.eql({
      lastUpdateMessageShowDate: null
    });
  });
  it('saves the lastUpdateMessageShowDate from SHOW_BULLES_UPDATE_SERVICE_MESSAGE action', () => {
    const now = new Date();
    const clock = useFakeTimers(now.getTime());
    const action = showBullesUpdateMessage({ id: 1, url: '' });
    const state: BullesUpdateState = {
      lastUpdateMessageShowDate: null
    };
    expect(bullesUpdate(state, action)).to.eql({
      lastUpdateMessageShowDate: now
    });
    clock.restore();
  });
});

import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import bullesUpgrade, { BullesUpgradeState } from './bullesUpgrade.reducer';
import { showBullesUpgradeServiceMessage } from '../../actions';

describe('background > reducers > bullesUpgrade', () => {
  it('has null lastServiceMessageShowDate initially', () => {
    // @ts-ignore
    expect(bullesUpgrade(undefined, { type: 'UNKNOWN_ACTION' })).to.eql({
      lastServiceMessageShowDate: null
    });
  });
  it('saves the lastServiceMessageShowDate from SHOW_BULLES_UPGRADE_SERVICE_MESSAGE action', () => {
    const now = new Date();
    const clock = useFakeTimers(now.getTime());
    const action = showBullesUpgradeServiceMessage();
    const state: BullesUpgradeState = {
      lastServiceMessageShowDate: null
    };
    expect(bullesUpgrade(state, action)).to.eql({
      lastServiceMessageShowDate: now
    });
    clock.restore();
  });
});

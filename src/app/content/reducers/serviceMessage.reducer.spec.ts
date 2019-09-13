import { expect } from 'chai';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';
import { closed, showBullesUpgradeServiceMessage } from 'app/actions';
import { CloseCause } from '../../lmem/ui';

describe('content > reducers > serviceMessage', () => {
  it('initialize to false', () => {
    expect(
      // @ts-ignore
      serviceMessage(undefined, { type: 'UNKNOWN' })
    ).to.have.property('showUpgradeMessage', false);
  });
  it('shows upgrade message when receive SHOW_BULLES_UPGRADE_SERVICE_MESSAGE', () => {
    const state: ServiceMessageState = {
      showUpgradeMessage: false
    };
    expect(
      serviceMessage(state, showBullesUpgradeServiceMessage())
    ).to.have.property('showUpgradeMessage', true);
  });
  it('removes the upgrade message when UI is CLOSED', () => {
    const state: ServiceMessageState = {
      showUpgradeMessage: true
    };
    expect(
      serviceMessage(state, closed(CloseCause.CloseButton))
    ).to.have.property('showUpgradeMessage', false);
  });
});

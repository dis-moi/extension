/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { subscribe, SubscribeAction } from '../../actions/subscription';
import { generateContributor } from 'test/fakers/generateContributor';
import subscriptionsReducer, {
  SubscriptionsState
} from './subscriptions.reducer';

describe('background > reducers > subscriptions', function() {
  it('is empty initially', () => {
    expect(subscriptionsReducer(undefined, { type: 'CLOSED' })).to.be.empty;
  });
  it('saves subscriptions', () => {
    const state: SubscriptionsState = [1, 2, 3];
    const subscribeTo42: SubscribeAction = subscribe(
      generateContributor({ id: 42 })
    );

    const expectedSubscriptions = [1, 2, 3, 42];

    expect(subscriptionsReducer(state, subscribeTo42)).to.include.members(
      expectedSubscriptions
    );
  });
  it('saves unsubscriptions', () => {
    const state: SubscriptionsState = [1, 2, 3];
    const unsubscribeFrom2: SubscribeAction = subscribe(
      generateContributor({ id: 2 })
    );

    expect(subscriptionsReducer(state, unsubscribeFrom2)).to.include.members([
      1,
      3
    ]);
  });
});

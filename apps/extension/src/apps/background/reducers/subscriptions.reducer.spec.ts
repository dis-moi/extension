/* eslint-disable no-unused-expressions, @typescript-eslint/ban-ts-ignore */
import { expect } from 'chai';
import { subscribe, SubscribeAction } from 'src/app/actions';
import subscriptionsReducer, {
  SubscriptionsState
} from './subscriptions.reducer';

const unknownAction = { type: 'UNKNOWN' };

describe('background > reducers > subscriptions', function() {
  it('is empty initially', () => {
    // @ts-ignore
    expect(subscriptionsReducer(undefined, unknownAction)).to.be.empty;
  });
  it('saves subscriptions', () => {
    const state: SubscriptionsState = [1, 2, 3];
    const subscribeTo42: SubscribeAction = subscribe(42);

    const expectedSubscriptions = [1, 2, 3, 42];

    expect(subscriptionsReducer(state, subscribeTo42)).to.include.members(
      expectedSubscriptions
    );
  });
  it('saves unsubscriptions', () => {
    const state: SubscriptionsState = [1, 2, 3];
    const unsubscribeFrom2: SubscribeAction = subscribe(2);

    expect(subscriptionsReducer(state, unsubscribeFrom2)).to.include.members([
      1,
      3
    ]);
  });
});

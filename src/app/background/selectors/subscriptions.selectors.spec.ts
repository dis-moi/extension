import { expect } from 'chai';
import * as R from 'ramda';
import { ResourcesState } from 'app/background/reducers/resources.reducer';
import { SubscriptionsState } from 'app/background//reducers/subscriptions.reducer';
import { generateContributor } from 'test/fakers/generateContributor';
import {
  getContributorsWithSubscriptionState,
  getNbSubscriptions,
  StateWithSubscriptions
} from './subscriptions.selectors';
import { Contributor } from 'app/lmem/contributor';

describe('background > selectors > subscriptions ', () => {
  describe('getContributorsWithSubscriptionState', () => {
    it('returns contributors list with subscription status', () => {
      const contributor1 = generateContributor({ id: 1 });
      const contributor2 = generateContributor({ id: 2 });
      const contributor3 = generateContributor({ id: 3 });
      const contributor42 = generateContributor({ id: 42 });
      const contributor54 = generateContributor({ id: 54 });
      const contributor1024 = generateContributor({ id: 1024 });
      const contributor9999 = generateContributor({ id: 9999 });

      const state: {
        resources: ResourcesState;
        subscriptions: SubscriptionsState;
      } = {
        resources: {
          matchingContexts: [],
          restrictedContexts: [],
          contributors: [
            contributor1,
            contributor2,
            contributor3,
            contributor42,
            contributor54,
            contributor1024,
            contributor9999
          ],
          notices: []
        },
        subscriptions: [1, 42, 1024]
      };

      const result: Contributor[] = getContributorsWithSubscriptionState(state);

      const byId = (id: number): Contributor | undefined =>
        result.find(R.propEq('id', id));

      expect(byId(1)).to.have.property('subscribed', true);
      expect(byId(2)).to.have.property('subscribed', false);
      expect(byId(3)).to.have.property('subscribed', false);
      expect(byId(42)).to.have.property('subscribed', true);
      expect(byId(54)).to.have.property('subscribed', false);
      expect(byId(1024)).to.have.property('subscribed', true);
      expect(byId(9999)).to.have.property('subscribed', false);

      expect(byId(42)).to.eql({
        ...contributor42,
        subscribed: true
      });
    });
  });

  describe('getNbSubscriptions', () => {
    it('returns the number of subscriptions', () => {
      const state: StateWithSubscriptions = {
        subscriptions: [1, 42, 1024]
      };

      const nbSubscriptions = getNbSubscriptions(state);

      expect(nbSubscriptions).to.equal(3);
    });
  });
});

/* eslint-disable @typescript-eslint/ban-ts-ignore, no-unused-expressions */
import { expect } from 'chai';
import {
  getNbTotalContributors,
  getNbSubscribedContributors,
  StateWithContributors
} from './contributors.selectors';

const stateWithContributorsStats: StateWithContributors = {
  contributors: {
    subscribed: 42,
    total: 65000
  }
};

describe('content > selectors > contributors', () => {
  describe('getNbTotalContributors', () => {
    it('returns number of total contributors', () => {
      expect(getNbTotalContributors(stateWithContributorsStats)).to.equal(
        65000
      );
    });
  });
  describe('getNbSubscribedContributors', () => {
    it('returns number of subscribed contributors', () => {
      expect(getNbSubscribedContributors(stateWithContributorsStats)).to.equal(
        42
      );
    });
  });
});

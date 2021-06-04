/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { generateContributor } from 'test/fakers/generateContributor';
import {
  contributorIsSubscribed,
  findContributorIn,
  StatefulContributor
} from './contributor';

describe('domain > contributor', () => {
  describe(' contributorIsSubscribed', () => {
    it("returns true if we're subscribed to it", () => {
      const contributor: StatefulContributor = {
        ...generateContributor(),
        subscribed: true
      };
      expect(contributorIsSubscribed(contributor)).to.be.true;
    });
    it("returns false if we're subscribed to it", () => {
      const contributor: StatefulContributor = {
        ...generateContributor(),
        subscribed: false
      };
      expect(contributorIsSubscribed(contributor)).to.be.false;
    });
    it("returns false if we don't know", () => {
      const contributor: StatefulContributor = generateContributor();
      expect(contributorIsSubscribed(contributor)).to.be.false;
    });
  });
  describe('findContributorIn', () => {
    it('finds contributor when present in list', () => {
      const contrib1 = generateContributor({ id: 1 });
      const contrib2 = generateContributor({ id: 2 });
      const contrib3 = generateContributor({ id: 3 });
      const contrib2Copy = generateContributor({ id: 2 });

      expect(
        findContributorIn([contrib1, contrib2, contrib3])(contrib2Copy)
      ).to.equal(contrib2);
    });
    it('returns null when contributor not present in list', () => {
      const contrib1 = generateContributor({ id: 1 });
      const contrib3 = generateContributor({ id: 3 });
      const contrib2Copy = generateContributor({ id: 2 });

      expect(findContributorIn([contrib1, contrib3])(contrib2Copy)).to.be
        .undefined;
    });
  });
});

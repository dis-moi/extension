/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { contributorIsSubscribed, StatefulContributor } from './contributor';
import { generateContributor } from 'test/fakers/generateContributor';

describe('lmem > contributor > contributorIsSubscribed', () => {
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

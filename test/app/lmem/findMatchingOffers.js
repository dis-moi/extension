import chai from 'chai';

import findMMCAccordingToPreferences from '../../../src/app/lmem/findMatchingOffersAccordingToPreferences';

const expect = chai.expect;

const offers = [
  {url_regex: 's.*'},
  {url_regex: 'SamSung'},
  {url_regex: 'doesNotMatch'}
];

const matchingURL = 'https://samsung.com/blabla';

describe('findMatchingOffers', function () {

  it('should be case insensitive', () => {
    const matches = findMMCAccordingToPreferences(matchingURL, offers, []);

    expect(matches).to.be.an('array');
    expect(matches).to.be.of.length(2);
    expect(matches[0]).to.equal(offers[0]);
    expect(matches[1]).to.equal(offers[1]);
  });

  describe('invalid regex', () => {
    const nastyOffers = [{url_regex: 'isNasty)'}].concat(offers); // SyntaxError: Invalid RegExp: Unmatched ')'

    it('should not screw up the matching engine', () => {
      const matches = findMMCAccordingToPreferences(matchingURL, nastyOffers, []);

      expect(findMMCAccordingToPreferences).to.not.throw(SyntaxError);

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(2);
      expect(matches[0]).to.equal(nastyOffers[1]);
      expect(matches[1]).to.equal(nastyOffers[2]);
    });

  });

});
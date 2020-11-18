import chai from 'chai';
import {
  filterContextsMatchingUrl,
  MatchingContext
} from 'app/lmem/matchingContext';
import generateMatchingContext from 'test/fakers/generateMatchingContext';

const expect = chai.expect;

const offers: MatchingContext[] = [
  generateMatchingContext({ urlRegex: 'www.samsung.com' }),
  generateMatchingContext({ urlRegex: 'arrested.com' })
];

const matchingURL = 'https://www.samsung.com/blabla';
const nonMatchingURL = 'https://soundcloud.com/capt-lovelace/meteo-marine';

describe('filterContextsMatchingUrl', function() {
  it('should be case insensitive', () => {
    const offersWithWeirdCase: MatchingContext[] = [
      generateMatchingContext({ urlRegex: 's.*' }),
      generateMatchingContext({ urlRegex: 'SamSung' }),
      generateMatchingContext({ urlRegex: 'doesNotMatch' })
    ];

    const matches = filterContextsMatchingUrl(
      matchingURL,
      offersWithWeirdCase
    );

    expect(matches).to.be.an('array');
    expect(matches).to.be.of.length(2);
    expect(matches[0]).to.equal(offersWithWeirdCase[0]);
    expect(matches[1]).to.equal(offersWithWeirdCase[1]);
  });

  describe('exclusion', () => {
    it('should exclude matching exclusion of otherwise matching url', () => {
      const offersWithExclusion: MatchingContext[] = [
        generateMatchingContext({
          urlRegex: 'samsung',
          excludeUrlRegex: 'blabla'
        })
      ];

      const matches = filterContextsMatchingUrl(
        matchingURL,
        offersWithExclusion
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(0);
    });

    it('should not exclude non matching exclusion of matching url', () => {
      const offersWithExclusion = [
        generateMatchingContext({
          urlRegex: 'samsung',
          excludeUrlRegex: 'nono'
        })
      ];

      const matches = filterContextsMatchingUrl(
        matchingURL,
        offersWithExclusion
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(offersWithExclusion[0]);
    });

    it('should exclude its matching context if regex is invalid', () => {
      const offersWithExclusion: MatchingContext[] = [
        generateMatchingContext({
          urlRegex: 'samsung',
          excludeUrlRegex: 'isNasty)'
        }), // SyntaxError: Invalid RegExp: Unmatched ')',
        ...offers
      ];

      const matches = filterContextsMatchingUrl(
        matchingURL,
        offersWithExclusion
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(offersWithExclusion[1]);
    });
  });

  describe('invalid regex', () => {
    const nastyOffers = [
      generateMatchingContext({
        urlRegex: 'isNasty'
      })
    ].concat(offers); // SyntaxError: Invalid RegExp: Unmatched ')'

    it('should not screw up the matching engine', () => {
      const matches = filterContextsMatchingUrl(
        matchingURL,
        nastyOffers
      );

      expect(filterContextsMatchingUrl).to.not.throw(
        SyntaxError
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(nastyOffers[1]);
    });
  });

  describe('empty prefs', () => {
    it('should match when the url matches an offer', () => {
      const matching = filterContextsMatchingUrl(
        matchingURL,
        offers
      );

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal(offers[0]);
    });

    it('should not match when the url does not match any offer', () => {
      const matching = filterContextsMatchingUrl(
        nonMatchingURL,
        offers
      );

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    });
  });
});

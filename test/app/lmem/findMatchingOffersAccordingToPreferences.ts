import chai from 'chai';
import {
  findMatchingOffersAccordingToPreferences,
  MatchingContext
} from '../../../src/app/lmem/matchingContext';

const expect = chai.expect;

const offers: MatchingContext[] = [
  { url_regex: 'www.samsung.com', recommendation_url: 'http://b' },
  { url_regex: 'arrested.com', recommendation_url: 'http://b' }
];
const draftRecommendations = [
  { url_regex: 'www.wordpress.com', recommendation_url: 'http://b' }
];

const matchingURL = 'https://www.samsung.com/blabla';
const matchingDraftURL = 'https://www.wordpress.com/lol';
const nonMatchingURL = 'https://soundcloud.com/capt-lovelace/meteo-marine';

describe('findMatchingOffersAccordingToPreferences', function() {
  it('should be case insensitive', () => {
    const offersWithWeirdCase: MatchingContext[] = [
      { url_regex: 's.*', recommendation_url: 'http://s' },
      { url_regex: 'SamSung', recommendation_url: 'http://S' },
      { url_regex: 'doesNotMatch', recommendation_url: 'http://d' }
    ];

    const matches = findMatchingOffersAccordingToPreferences(
      matchingURL,
      offersWithWeirdCase,
      []
    );

    expect(matches).to.be.an('array');
    expect(matches).to.be.of.length(2);
    expect(matches[0]).to.equal(offersWithWeirdCase[0]);
    expect(matches[1]).to.equal(offersWithWeirdCase[1]);
  });

  describe('exclusion', () => {
    it('should exclude matching exclusion of otherwise matching url', () => {
      const offersWithExclusion: MatchingContext[] = [
        {
          url_regex: 'samsung',
          exclude_url_regex: 'blabla',
          recommendation_url: 'http://b'
        }
      ];

      const matches = findMatchingOffersAccordingToPreferences(
        matchingURL,
        offersWithExclusion,
        []
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(0);
    });

    it('should not exclude non matching exclusion of matching url', () => {
      const offersWithExclusion = [
        {
          url_regex: 'samsung',
          exclude_url_regex: 'nono',
          recommendation_url: 'http://b'
        }
      ];

      const matches = findMatchingOffersAccordingToPreferences(
        matchingURL,
        offersWithExclusion,
        []
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(offersWithExclusion[0]);
    });

    it('should exclude its matching context if regex is invalid', () => {
      const offersWithExclusion: MatchingContext[] = [
        {
          url_regex: 'samsung',
          exclude_url_regex: 'isNasty)',
          recommendation_url: 'http://b'
        }, // SyntaxError: Invalid RegExp: Unmatched ')',
        ...offers
      ];

      const matches = findMatchingOffersAccordingToPreferences(
        matchingURL,
        offersWithExclusion,
        []
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(offersWithExclusion[1]);
    });
  });

  describe('invalid regex', () => {
    const nastyOffers = [
      { url_regex: 'isNasty)', recommendation_url: 'http://b' }
    ].concat(offers); // SyntaxError: Invalid RegExp: Unmatched ')'

    it('should not screw up the matching engine', () => {
      const matches = findMatchingOffersAccordingToPreferences(
        matchingURL,
        nastyOffers,
        []
      );

      expect(findMatchingOffersAccordingToPreferences).to.not.throw(
        SyntaxError
      );

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(nastyOffers[1]);
    });
  });

  describe('empty prefs, no draft', () => {
    it('should match when the url matches an offer', () => {
      const matching = findMatchingOffersAccordingToPreferences(
        matchingURL,
        offers,
        []
      );

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal(offers[0]);
    });

    it('should not match when the url does not match any offer', () => {
      const matching = findMatchingOffersAccordingToPreferences(
        nonMatchingURL,
        offers,
        []
      );

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    });
  });

  describe('draft recommendations', () => {
    it('should match a draft recommendation', () => {
      const matching = findMatchingOffersAccordingToPreferences(
        matchingDraftURL,
        offers,
        draftRecommendations
      );

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal(draftRecommendations[0]);
    });

    it('should favor draft previews over public offers', () => {
      const draftRec = {
        url_regex: 'www.wordpress.com',
        recommendation_url: 'http://b',
        recommendation: {
          visibility: 'private'
        }
      };
      const publicRec = {
        url_regex: 'www.wordpress.com',
        recommendation_url: 'http://b',
        recommendation: {
          visibility: 'public'
        }
      };

      const matching = findMatchingOffersAccordingToPreferences(
        matchingDraftURL,
        [publicRec],
        [draftRec]
      );

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal(draftRec);
    });
  });
});

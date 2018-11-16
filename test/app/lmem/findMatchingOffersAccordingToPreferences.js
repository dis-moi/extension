import chai from 'chai';
import { Map as ImmutableMap, fromJS } from 'immutable';

import findMatchingOffersAccordingToPreferences from '../../../src/app/lmem/findMatchingOffersAccordingToPreferences';

const expect = chai.expect;

const offers = [
  {url_regex: 'www.samsung.com'},
  {url_regex: 'arrested.com'},
];
const draftRecommendations = [
  {url_regex: 'www.wordpress.com'},
];

const matchingURL = 'https://www.samsung.com/blabla';
const matchingDraftURL = 'https://www.wordpress.com/lol';
const nonMatchingURL = 'https://soundcloud.com/capt-lovelace/meteo-marine';

describe('findMatchingOffersAccordingToPreferences', function () {

  it('should be case insensitive', () => {
    const offersWithWeirdCase = [
      {url_regex: 's.*'},
      {url_regex: 'SamSung'},
      {url_regex: 'doesNotMatch'}
    ];

    const matches = findMatchingOffersAccordingToPreferences(matchingURL, offersWithWeirdCase, []);

    expect(matches).to.be.an('array');
    expect(matches).to.be.of.length(2);
    expect(matches[0]).to.equal(offersWithWeirdCase[0]);
    expect(matches[1]).to.equal(offersWithWeirdCase[1]);
  });

  describe('exclusion', () => {
    it('should exclude matching exclusion of otherwise matching url', () => {
      const offersWithExclusion = [
        { url_regex: 'samsung', exclude_url_regex: 'blabla' },
      ];

      const matches = findMatchingOffersAccordingToPreferences(matchingURL, offersWithExclusion, []);

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(0);
    });

    it('should not exclude non matching exclusion of matching url', () => {
      const offersWithExclusion = [
        { url_regex: 'samsung', exclude_url_regex: 'nono' },
      ];

      const matches = findMatchingOffersAccordingToPreferences(matchingURL, offersWithExclusion, []);

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(offersWithExclusion[0]);
    });

    it('should exclude its matching context if regex is invalid', () => {
      const offersWithExclusion = [
        { url_regex: 'samsung', exclude_url_regex: 'isNasty)' }, // SyntaxError: Invalid RegExp: Unmatched ')'
      ].concat(offers);

      const matches = findMatchingOffersAccordingToPreferences(matchingURL, offersWithExclusion, []);

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(offersWithExclusion[1]);
    });
  });

  describe('invalid regex', () => {
    const nastyOffers = [{url_regex: 'isNasty)'}].concat(offers); // SyntaxError: Invalid RegExp: Unmatched ')'

    it('should not screw up the matching engine', () => {
      const matches = findMatchingOffersAccordingToPreferences(matchingURL, nastyOffers, []);

      expect(findMatchingOffersAccordingToPreferences).to.not.throw(SyntaxError);

      expect(matches).to.be.an('array');
      expect(matches).to.be.of.length(1);
      expect(matches[0]).to.equal(nastyOffers[1]);
    });
  });

  describe('empty prefs, no draft', () => {
    
    it('should match when the url matches an offer', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingURL, offers, [])

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect( matching[0] ).to.equal( offers[0] );
    })
    
    it('should not match when the url does not match any offer', () => {
      const matching = findMatchingOffersAccordingToPreferences(nonMatchingURL, offers, [])

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    })

  })

  describe('pref with deactivated.everywhereUntil in the future', () => {
    
    const prefs = fromJS({
      deactivated: {
        // in the future
        everywhereUntil : Date.now() + 100*1000
      }
    });

    it('should not match when deactivatedEverywhereUntil is in the future', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingURL, offers, [], prefs)

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    })

  })

  describe('pref with deactivatedWebsites', () => {
    
    const prefs = fromJS({
      deactivated: {
        deactivatedWebsites : new Set([
          'www.samsung.com',
          'yo.com'
        ])
      }
    });

    it('should not match with matching url, but pref listing as deactivated', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingURL, offers, [], prefs)

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    })

  })

  describe('draft recommendations', () => {

    it('should match a draft recommendation', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingDraftURL, offers, draftRecommendations)

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal( draftRecommendations[0] );
    })

    it('should favor draft previews over public offers', () => {
      const draftRec = {
        url_regex: 'www.wordpress.com',
        recommendation: {
          visibility: "private"
        }
      };
      const publicRec = {
        url_regex: 'www.wordpress.com',
        recommendation: {
          visibility: "public"
        }
      };

      const matching = findMatchingOffersAccordingToPreferences(matchingDraftURL, [publicRec], [draftRec])

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal( draftRec );
    })

  })

});
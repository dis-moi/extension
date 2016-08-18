import chai from 'chai';

import findMatchingOffersAccordingToPreferences from '../../../src/app/lmem/findMatchingOffersAccordingToPreferences';

const expect = chai.expect;

const offers = [
  {url_regex: 'www.samsung.com'},
  {url_regex: 'arrested.com'}
]
const draftRecommandations = [
  {url_regex: 'www.wordpress.com'}
]

const matchingURL = 'https://www.samsung.com/blabla';
const matchingDraftURL = 'https://www.wordpress.com/lol';
const nonMatchingURL = 'https://soundcloud.com/capt-lovelace/meteo-marine';


describe('findMatchingOffersAccordingToPreferences', function () {

  describe('empty prefs, no draft', () => {
    
    it('should match when the url matches an offer', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingURL, offers, [], {})

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect( matching[0] ).to.equal( offers[0] );
    })
    
    it('should not match when the url does not match any offer', () => {
      const matching = findMatchingOffersAccordingToPreferences(nonMatchingURL, offers, [], {})

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    })

  })

  describe('pref with deactivatedEverywhereUntil in the future', () => {
    
    const prefs = {
      deactivated: {
        // in the future
        deactivatedEverywhereUntil : Date.now() + 100*1000
      }
    };

    it('should not match when deactivatedEverywhereUntil is in the future', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingURL, offers, [], prefs)

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    })

  })

  describe('pref with deactivatedWebsites', () => {
    
    const prefs = {
      deactivated: {
        deactivatedWebsites : new Set([
          'www.samsung.com',
          'yo.com'
        ])
      }
    };

    it('should not match with matching url, but pref listing as deactivated', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingURL, offers, [], prefs)

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(0);
    })

  })

  describe('draft recommandations', () => {

    it('should match a draft recommandation', () => {
      const matching = findMatchingOffersAccordingToPreferences(matchingDraftURL, offers, draftRecommandations, {})

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal( draftRecommandations[0] );
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

      const matching = findMatchingOffersAccordingToPreferences(matchingDraftURL, [publicRec], [draftRec], {})

      expect(matching).to.be.an('array');
      expect(matching).to.be.of.length(1);
      expect(matching[0]).to.equal( draftRec );
    })

  })

});
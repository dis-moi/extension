import chai from 'chai';
import {
  MatchingContext,
  urlMatchesContext
} from 'libs/domain/matchingContext';
import generateMatchingContext from 'test/fakers/generateMatchingContext';

const expect = chai.expect;

const offers: MatchingContext[] = [
  generateMatchingContext({ urlRegex: 'www.samsung.com' }),
  generateMatchingContext({ urlRegex: 'arrested.com' })
];

const matchingURL = 'https://www.samsung.com/blabla';
const nonMatchingURL = 'https://soundcloud.com/capt-lovelace/meteo-marine';

describe('urlMatchesContext', function() {
  it('should be case insensitive', () => {
    expect(
      urlMatchesContext(
        matchingURL,
        generateMatchingContext({ urlRegex: 's.*' })
      )
    ).to.equal(true);

    expect(
      urlMatchesContext(
        matchingURL,
        generateMatchingContext({ urlRegex: 'SamSung' })
      )
    ).to.equal(true);

    expect(
      urlMatchesContext(
        matchingURL,
        generateMatchingContext({ urlRegex: 'doesNotMatch' })
      )
    ).to.equal(false);
  });

  describe('exclusion', () => {
    it('should exclude matching exclusion of otherwise matching url', () => {
      const offersWithExclusion: MatchingContext = generateMatchingContext({
        urlRegex: 'samsung',
        excludeUrlRegex: 'blabla'
      });

      const matches = urlMatchesContext(matchingURL, offersWithExclusion);

      expect(matches).to.equal(false);
    });

    it('should not exclude non matching exclusion of matching url', () => {
      const offersWithExclusion = generateMatchingContext({
        urlRegex: 'samsung',
        excludeUrlRegex: 'nono'
      });

      const matches = urlMatchesContext(matchingURL, offersWithExclusion);

      expect(matches).to.equal(true);
    });

    it('should exclude its matching context if regex is invalid', () => {
      const offersWithExclusion: MatchingContext = generateMatchingContext({
        urlRegex: 'samsung',
        excludeUrlRegex: 'isNasty)'
      });

      const matches = urlMatchesContext(matchingURL, offersWithExclusion);

      expect(matches).to.equal(false);
    });
  });

  describe('invalid regex', () => {
    const nastyOffers = generateMatchingContext({
      urlRegex: 'isNasty)'
    });

    it('should not screw up the matching engine', () => {
      expect(urlMatchesContext(matchingURL, nastyOffers)).to.equal(false);
    });
  });

  describe('empty prefs', () => {
    it('should match when the url matches an offer', () => {
      expect(urlMatchesContext(matchingURL, offers[0])).to.equal(true);
      expect(urlMatchesContext(matchingURL, offers[1])).to.equal(false);
    });

    it('should not match when the url does not match any offer', () => {
      expect(urlMatchesContext(nonMatchingURL, offers[0])).to.equal(false);
      expect(urlMatchesContext(nonMatchingURL, offers[1])).to.equal(false);
    });
  });
});

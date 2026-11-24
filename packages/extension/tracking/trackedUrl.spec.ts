import { expect } from 'chai';
import { screenUrl, siteUrl } from './trackedUrl';

describe('trackedUrl', () => {
  describe('screenUrl', () => {
    it('exposes an extension route as the page path', () => {
      expect(screenUrl('/account/filters')).to.equal(
        'app://extension/account/filters',
      );
    });
  });

  describe('siteUrl', () => {
    it('keeps only the domain of the visited page', () => {
      expect(
        siteUrl('https://mail.example.org/messages/id/0053c159?token=secret'),
      ).to.equal('app://extension/sites/mail.example.org');
    });

    it('merges the www variant with the bare domain', () => {
      expect(siteUrl('https://www.example.org/')).to.equal(
        'app://extension/sites/example.org',
      );
    });

    it('drops the port and the credentials', () => {
      expect(siteUrl('http://user:pass@example.org:8080/path')).to.equal(
        'app://extension/sites/example.org',
      );
    });

    it('does not expose pages that are not on the web', () => {
      expect(siteUrl('chrome-extension://abcdef/profiles.html')).to.equal(
        'app://extension/internal',
      );
    });

    it('falls back to the internal page without a usable address', () => {
      expect(siteUrl(undefined)).to.equal('app://extension/internal');
      expect(siteUrl('not a url')).to.equal('app://extension/internal');
    });
  });
});

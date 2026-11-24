import { describe, expect, it } from 'vitest';
import {
  completeExcludeUrlRegex,
  fullUrlRegex,
  pregQuote,
  relatedDomains,
} from './UrlPattern';

describe('domain > URL pattern', () => {
  describe('escaping the way preg_quote does', () => {
    it('escapes the dot and the dash, the only two seen in production', () => {
      expect(pregQuote('www.20minutes.fr')).toBe('www\\.20minutes\\.fr');
      expect(pregQuote('agence-voyage.oui.sncf')).toBe(
        'agence\\-voyage\\.oui\\.sncf',
      );
    });

    it('escapes the whole list PHP documents', () => {
      expect(pregQuote('.\\+*?[^]$(){}=!<>|:-#')).toBe(
        '\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-\\#',
      );
    });

    it('leaves the slash untouched, the backend passing no delimiter', () => {
      expect(pregQuote('boulanger.com/c/ustensile-accessoire')).toBe(
        'boulanger\\.com/c/ustensile\\-accessoire',
      );
    });

    it('leaves letters, digits and other signs untouched', () => {
      expect(pregQuote('abc123_~%&;,\'"')).toBe('abc123_~%&;,\'"');
    });
  });

  describe('related domains', () => {
    const domain = (
      name: string,
      path: string | null = null,
      aliases: string[] = [],
    ) => ({ name, path, aliases });

    it('places the domains of the sets before the direct domains', () => {
      expect(
        relatedDomains({
          domainsSets: [{ domains: [domain('dujeu.fr')] }],
          domainNames: [domain('direct.fr')],
        }),
      ).toEqual(['dujeu.fr', 'direct.fr']);
    });

    it('deduplicates on the complete name, path included', () => {
      expect(
        relatedDomains({
          domainsSets: [{ domains: [domain('a.fr', '/x')] }],
          domainNames: [domain('a.fr', '/x'), domain('a.fr', '/y')],
        }),
      ).toEqual(['a.fr/x', 'a.fr/y']);
    });

    it('ignores empty aliases, which Doctrine produces for an empty string', () => {
      expect(
        relatedDomains({
          domainsSets: [],
          domainNames: [domain('a.fr', null, ['', 'b.fr', ''])],
        }),
      ).toEqual(['a.fr', 'b.fr']);
    });

    it('follows each domain with its aliases', () => {
      expect(
        relatedDomains({
          domainsSets: [],
          domainNames: [domain('a.fr', null, ['alias-a.fr']), domain('b.fr')],
        }),
      ).toEqual(['a.fr', 'alias-a.fr', 'b.fr']);
    });
  });

  describe('complete pattern', () => {
    it('prefixes the path pattern with the group of escaped domains', () => {
      expect(
        fullUrlRegex(
          {
            domainsSets: [],
            domainNames: [
              { name: 'www.20minutes.fr', path: null, aliases: [] },
            ],
          },
          '.*/societe/1860259',
        ),
      ).toBe('(www\\.20minutes\\.fr).*/societe/1860259');
    });

    it('separates the domains with a pipe', () => {
      expect(
        fullUrlRegex(
          {
            domainsSets: [],
            domainNames: [
              { name: 'a.fr', path: null, aliases: ['b.fr'] },
              { name: 'c.fr', path: null, aliases: [] },
            ],
          },
          '/x',
        ),
      ).toBe('(a\\.fr|b\\.fr|c\\.fr)/x');
    });

    it('returns the path pattern alone when no domain is related', () => {
      expect(
        fullUrlRegex({ domainsSets: [], domainNames: [] }, '^https://a\\.fr/x'),
      ).toBe('^https://a\\.fr/x');
    });

    it('folds the path of the domain into the group', () => {
      expect(
        fullUrlRegex(
          {
            domainsSets: [],
            domainNames: [{ name: 'leroymerlin.fr', path: '/fr', aliases: [] }],
          },
          '/offres',
        ),
      ).toBe('(leroymerlin\\.fr/fr)/offres');
    });
  });

  describe('exclusion', () => {
    it('combines both exclusions into one group', () => {
      expect(completeExcludeUrlRegex('/panier', '/compte')).toBe(
        '(/panier|/compte)',
      );
    });

    it('returns the one of the context when the notice has none', () => {
      expect(completeExcludeUrlRegex('/panier', null)).toBe('/panier');
    });

    it('returns the one of the notice when the context has none', () => {
      expect(completeExcludeUrlRegex(null, '/compte')).toBe('/compte');
    });

    it('returns nothing when neither exists', () => {
      expect(completeExcludeUrlRegex(null, null)).toBeNull();
    });

    it('lets an empty exclusion of the context win over the one of the notice, ?? firing on null alone', () => {
      expect(completeExcludeUrlRegex('', '/compte')).toBe('');
      expect(completeExcludeUrlRegex('/panier', '')).toBe('/panier');
      expect(completeExcludeUrlRegex('', '')).toBe('');
      expect(completeExcludeUrlRegex(null, '')).toBe('');
    });
  });
});

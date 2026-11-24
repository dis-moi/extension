import { describe, expect, it } from 'vitest';
import { mergeQueryParameter, normaliseComponent, normaliseHost } from './Uri';

describe('URI handling', () => {
  describe('host normalisation', () => {
    it('lowercases it, notice 2456', () => {
      expect(normaliseHost('Societe.com')).toBe('societe.com');
    });

    it('turns a non-ASCII name into Punycode, notice 1087', () => {
      expect(normaliseHost('Résilier.com')).toBe('xn--rsilier-bya.com');
    });

    it('leaves an ASCII host alone, port included', () => {
      expect(normaliseHost('exemple.fr:8080')).toBe('exemple.fr:8080');
    });
  });

  describe('component normalisation', () => {
    it('decodes what did not need encoding, notices 2269 and 1072', () => {
      expect(normaliseComponent('type=product%2Carticle')).toBe(
        'type=product,article',
      );
      expect(normaliseComponent('produit%3A151')).toBe('produit:151');
      expect(normaliseComponent('fh_location=/$s%3Dsanderson')).toBe(
        'fh_location=/$s=sanderson',
      );
    });

    it('keeps the pair separator encoded, notice 1457', () => {
      expect(normaliseComponent('familles=Fruits+%26+Legumes')).toBe(
        'familles=Fruits+%26+Legumes',
      );
    });

    it('keeps encoded what is not allowed, notices 811 and 755', () => {
      expect(normaliseComponent('s%5B6%5D%5B%5D:2323')).toBe(
        's%5B6%5D%5B%5D:2323',
      );
      expect(normaliseComponent('/manufacturer%3E')).toBe('/manufacturer%3E');
    });

    it('encodes what is forbidden and written plainly, notice 811', () => {
      expect(normaliseComponent('s[6][]')).toBe('s%5B6%5D%5B%5D');
    });

    it('leaves the case of a kept sequence alone, notice 1122', () => {
      expect(normaliseComponent('cafe-%e2%98%95/')).toBe('cafe-%e2%98%95/');
    });

    it('leaves non-ASCII characters as they are, notices 648 to 663', () => {
      expect(normaliseComponent('/maps/place/Melvita+Opéra/')).toBe(
        '/maps/place/Melvita+Opéra/',
      );
    });

    it('keeps the colons of a relative path first segment encoded, notice 1926', () => {
      expect(normaliseComponent('%3A%20https%3A//a.fr/b', true)).toBe(
        '%3A%20https%3A//a.fr/b',
      );
    });

    it('decodes the colons of the following segments', () => {
      expect(normaliseComponent('a/b%3Ac', true)).toBe('a/b:c');
    });
  });

  describe('merging a parameter', () => {
    const put = (url: string) => mergeQueryParameter(url, 'utm_medium', 'X');

    it('adds the parameter to an address with no query', () => {
      expect(put('https://a.fr')).toBe('https://a.fr?utm_medium=X');
    });

    it('adds no slash to an address with no path', () => {
      expect(put('http://societe.com')).toBe('http://societe.com?utm_medium=X');
    });

    it('adds the parameter at the end of an existing query', () => {
      expect(put('https://a.fr/b?c=1&d')).toBe(
        'https://a.fr/b?c=1&d&utm_medium=X',
      );
    });

    it('replaces the parameter in place when it already exists', () => {
      expect(put('https://a.fr?x=1&utm_medium=ancien&y=2')).toBe(
        'https://a.fr?x=1&utm_medium=X&y=2',
      );
    });

    it('drops the surplus occurrences of the parameter', () => {
      expect(put('https://a.fr?utm_medium=a&z=1&utm_medium=b')).toBe(
        'https://a.fr?utm_medium=X&z=1',
      );
    });

    it('keeps the fragment', () => {
      expect(put('https://a.fr/b#titre')).toBe(
        'https://a.fr/b?utm_medium=X#titre',
      );
    });

    it('does not lowercase a relative path, notice 2270', () => {
      expect(put('Peopeo')).toBe('Peopeo?utm_medium=X');
    });
  });
});

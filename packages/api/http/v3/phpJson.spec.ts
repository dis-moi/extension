import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { encodePhpJson } from './phpJson';

const fixture = (name: string): string =>
  readFileSync(join(__dirname, '../../test/fixtures/v3', name), 'utf8');

describe('http v3 > JSON encoding the way PHP does it', () => {
  describe('escapes', () => {
    it('escapes the slashes', () => {
      expect(encodePhpJson('https://a.fr/b')).toBe('"https:\\/\\/a.fr\\/b"');
    });

    it('escapes the non-ASCII characters in lower case', () => {
      expect(encodePhpJson('Société')).toBe('"Soci\\u00e9t\\u00e9"');
    });

    it('escapes a character outside the basic plane as a surrogate pair', () => {
      expect(encodePhpJson('🙂')).toBe('"\\ud83d\\ude42"');
    });

    it('keeps the escapes JSON already demands', () => {
      expect(encodePhpJson('a"b\\c\nd\te')).toBe('"a\\"b\\\\c\\nd\\te"');
    });

    it('adds no whitespace', () => {
      expect(encodePhpJson({ a: 1, b: [2, 3] })).toBe('{"a":1,"b":[2,3]}');
    });

    it('keeps the insertion order of the keys', () => {
      expect(encodePhpJson({ z: 1, a: 2 })).toBe('{"z":1,"a":2}');
    });

    it('gives null values and booleans as JSON does', () => {
      expect(encodePhpJson({ a: null, b: true, c: false })).toBe(
        '{"a":null,"b":true,"c":false}',
      );
    });

    it('tells an empty array from an empty object', () => {
      expect(encodePhpJson([])).toBe('[]');
      expect(encodePhpJson({})).toBe('{}');
    });
  });

  describe('against the bytes production serves', () => {
    it('reproduces the answer of the categories', () => {
      const expected = fixture('categories.json');

      expect(
        encodePhpJson({
          CONSO: 'Conso',
          CULTURE: 'Culture & Société',
          MILITANT: 'Militant',
          DIVERS: 'Divers',
        }),
      ).toBe(expected);
    });

    it('re-encodes the restricted contexts identically', () => {
      const expected = fixture('restricted-contexts.json');

      expect(encodePhpJson(JSON.parse(expected))).toBe(expected);
    });

    it('re-encodes the first 1,000 notices identically', () => {
      const expected = fixture('notices-0.json');

      expect(encodePhpJson(JSON.parse(expected))).toBe(expected);
    });

    it('re-encodes the 178 contributors identically', () => {
      const expected = fixture('contributors.json');

      expect(encodePhpJson(JSON.parse(expected))).toBe(expected);
    });

    it('re-encodes the 3,972 targeting contexts identically', () => {
      const expected = fixture('matching-contexts-all.json');

      expect(encodePhpJson(JSON.parse(expected))).toBe(expected);
    });
  });
});

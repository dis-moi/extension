import { describe, expect, it } from 'vitest';
import { readStringArray } from './PhpSerialise';

describe('reading a serialised PHP array', () => {
  it('reads a single role, as it stands in the database', () => {
    expect(readStringArray('a:1:{i:0;s:10:"ROLE_ADMIN";}')).toEqual([
      'ROLE_ADMIN',
    ]);
  });

  it('reads the super-administration account', () => {
    expect(readStringArray('a:1:{i:0;s:16:"ROLE_SUPER_ADMIN";}')).toEqual([
      'ROLE_SUPER_ADMIN',
    ]);
  });

  it('reads several roles', () => {
    expect(
      readStringArray('a:2:{i:0;s:9:"ROLE_USER";i:1;s:10:"ROLE_ADMIN";}'),
    ).toEqual(['ROLE_USER', 'ROLE_ADMIN']);
  });

  it('reads an empty array', () => {
    expect(readStringArray('a:0:{}')).toEqual([]);
  });

  it('counts bytes and not characters, Ô taking two of them', () => {
    expect(readStringArray('a:1:{i:0;s:5:"RÔLE";}')).toEqual(['RÔLE']);
  });

  it('accepts a quote inside the value, PHP escaping nothing', () => {
    expect(readStringArray('a:1:{i:0;s:3:"a"b";}')).toEqual(['a"b']);
  });

  describe('refusals, because an empty list would mean "no rights"', () => {
    it('refuses a string that is not an array', () => {
      expect(() => readStringArray('s:4:"abcd";')).toThrow('not an array');
    });

    it('refuses an item count that does not match', () => {
      expect(() => readStringArray('a:2:{i:0;s:9:"ROLE_USER";}')).toThrow('2');
    });

    it('refuses an announced length that is wrong', () => {
      expect(() => readStringArray('a:1:{i:0;s:99:"ROLE_USER";}')).toThrow(
        'announced length wrong',
      );
    });

    it('refuses an empty value', () => {
      expect(() => readStringArray('')).toThrow('not an array');
    });
  });
});

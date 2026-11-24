import { expect } from 'chai';
import {
  checkbox,
  field,
  fieldOrNull,
  domains,
  integerOrNull,
  integers,
  integerList,
} from './form';

describe('admin > form', function () {
  const formWith = (
    entries: ReadonlyArray<readonly [string, string]>,
  ): FormData => {
    const form = new FormData();
    for (const [name, value] of entries) form.append(name, value);
    return form;
  };

  describe('field', function () {
    it('gives the value, the empty string when missing', function () {
      const form = formWith([['name', 'Amazon']]);
      expect(field(form, 'name')).to.equal('Amazon');
      expect(field(form, 'missing')).to.equal('');
    });
  });

  describe('fieldOrNull', function () {
    it('gives null for an empty or blank field, the database telling NULL from the empty string', function () {
      const form = formWith([
        ['empty', ''],
        ['blank', '   '],
        ['filled', '  Amazon  '],
      ]);

      expect(fieldOrNull(form, 'empty')).to.equal(null);
      expect(fieldOrNull(form, 'blank')).to.equal(null);
      expect(fieldOrNull(form, 'missing')).to.equal(null);
      expect(fieldOrNull(form, 'filled')).to.equal('Amazon');
    });
  });

  describe('checkbox', function () {
    it('sees a ticked box, and reads its absence from the FormData as a no', function () {
      const form = formWith([['enabled', 'on']]);
      expect(checkbox(form, 'enabled')).to.equal(true);
      expect(checkbox(form, 'other')).to.equal(false);
    });
  });

  describe('integerOrNull', function () {
    it('reads an integer, negative ones included', function () {
      const form = formWith([
        ['id', '242'],
        ['negative', '-3'],
      ]);
      expect(integerOrNull(form, 'id')).to.equal(242);
      expect(integerOrNull(form, 'negative')).to.equal(-3);
    });

    it('gives null for what is not an integer', function () {
      const form = formWith([
        ['empty', ''],
        ['word', 'abc'],
        ['decimal', '1.5'],
      ]);
      expect(integerOrNull(form, 'empty')).to.equal(null);
      expect(integerOrNull(form, 'word')).to.equal(null);
      expect(integerOrNull(form, 'decimal')).to.equal(null);
      expect(integerOrNull(form, 'missing')).to.equal(null);
    });
  });

  describe('integers', function () {
    it('reads a repeated field and drops the unreadable ones', function () {
      const form = formWith([
        ['relayers', '12'],
        ['relayers', 'abc'],
        ['relayers', '34'],
      ]);
      expect([...integers(form, 'relayers')]).to.deep.equal([12, 34]);
    });

    it('gives an empty list when the field is missing', function () {
      expect([...integers(new FormData(), 'relayers')]).to.deep.equal([]);
    });
  });

  describe('integerList', function () {
    it('keeps the submitted order, which is the one of the pins the profile page follows', function () {
      const form = formWith([['pinned', '7,3,12']]);
      expect([...integerList(form, 'pinned')]).to.deep.equal([7, 3, 12]);
    });

    it('accepts spaces and drops the non-positive values', function () {
      const form = formWith([['pinned', ' 7 , 0 , -2, abc, 3 ']]);
      expect([...integerList(form, 'pinned')]).to.deep.equal([7, 3]);
    });
  });

  describe('domains', function () {
    it('accepts commas and spaces', function () {
      const form = formWith([
        ['domains', 'amazon.fr, www.amazon.fr  amazon.com'],
      ]);
      expect([...domains(form, 'domains')]).to.deep.equal([
        'amazon.fr',
        'www.amazon.fr',
        'amazon.com',
      ]);
    });

    it('never emits an empty domain, whose alternative would match everything', function () {
      const form = formWith([['domains', ' , amazon.fr ,, ']]);
      expect([...domains(form, 'domains')]).to.deep.equal(['amazon.fr']);
    });
  });
});

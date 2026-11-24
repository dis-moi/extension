import { expect } from 'chai';
import {
  category,
  shortDate,
  since,
  state,
  excerpt,
  number,
  shortNumber,
} from './format';

describe('admin > format', function () {
  describe('number', function () {
    it('separates the thousands with a plain no-break space, the narrow U+202F of toLocaleString being too tight in a column', function () {
      expect(number(11606805)).to.equal('11 606 805');
      expect(number(2340)).to.equal('2 340');
      expect(number(0)).to.equal('0');
    });

    it('never introduces U+202F', function () {
      expect(number(1234567)).to.not.include(' ');
    });
  });

  describe('shortNumber', function () {
    it('abbreviates the thousands and the millions', function () {
      expect(shortNumber(11606805)).to.equal('11.6 M');
      expect(shortNumber(2340)).to.equal('2.3 k');
      expect(shortNumber(999)).to.equal('999');
      expect(shortNumber(0)).to.equal('0');
    });
  });

  describe('shortDate', function () {
    it('reads 23:50 on 31 December without rolling the year over, the wall-clock time not going through Date', function () {
      expect(shortDate('2024-12-31 23:50:00')).to.equal('31 déc. 2024');
      expect(shortDate('2019-12-01 00:10:00')).to.equal('1 déc. 2019');
      expect(shortDate('2026-01-05')).to.equal('5 janv. 2026');
    });

    it('gives a dash for a missing date', function () {
      expect(shortDate(null)).to.equal('—');
    });

    it('gives the string as it stands when it is not a date', function () {
      expect(shortDate('jamais')).to.equal('jamais');
    });
  });

  describe('since', function () {
    const dayAt = (offset: number): string => {
      const date = new Date(Date.now() + offset * 86_400_000);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
      )}-${String(date.getDate()).padStart(2, '0')} 12:00:00`;
    };

    it('names the close durations', function () {
      expect(since(dayAt(0))).to.equal('aujourd’hui');
      expect(since(dayAt(-1))).to.equal('hier');
      expect(since(dayAt(-5))).to.equal('il y a 5 jours');
    });

    it('switches to months then to years', function () {
      expect(since(dayAt(-60))).to.equal('il y a 2 mois');
      expect(since(dayAt(-365 * 5))).to.equal('il y a 5 ans');
    });

    it('gives a dash for a missing date', function () {
      expect(since(null)).to.equal('—');
    });

    it('falls back to the short date when the string is unreadable', function () {
      expect(since('pas une date')).to.equal('pas une date');
    });
  });

  describe('state', function () {
    it('names the visibilities the API serves', function () {
      expect(state('public').label).to.equal('Publique');
      expect(state('draft').label).to.equal('Brouillon');
      expect(state('question').label).to.equal('Question');
    });

    it('gives the raw value of an unknown visibility rather than an invented label', function () {
      expect(state('inattendu').label).to.equal('inattendu');
      expect(state('inattendu').className).to.equal('admin-state-neutral');
    });
  });

  describe('category', function () {
    it('translates the codes of the PHP enumeration', function () {
      expect(category('CONSO')).to.equal('Conso');
      expect(category('CULTURE')).to.equal('Culture & Société');
    });

    it('gives the code as it stands when it is unknown', function () {
      expect(category('NOUVEAU')).to.equal('NOUVEAU');
    });
  });

  describe('excerpt', function () {
    it('removes the tags from the message', function () {
      expect(excerpt('<p>Bonjour <a href="#">ici</a></p>', 80)).to.equal(
        'Bonjour ici',
      );
    });

    it('truncates with an ellipsis', function () {
      expect(excerpt('abcdefghij', 5)).to.equal('abcd…');
    });

    it('does not truncate what fits', function () {
      expect(excerpt('abcde', 5)).to.equal('abcde');
    });
  });
});

import { expect } from 'chai';
import formatDate from './format';

describe('i18n', () => {
  describe('formatDate', () => {
    const testCreationDate = new Date(2021, 4 /* may */, 10);
    it('formats to short format by default', () => {
      expect(formatDate(testCreationDate)).to.equal('10/05/2021');
    });
    it('can formats to human friendly format', () => {
      // @see https://date-fns.org/v2.21.3/docs/format
      expect(
        formatDate(testCreationDate, 'eeee dd MMMM yyyy', 'fr-FR')
      ).to.equal('lundi 10 mai 2021');
    });
    it('formats to english by default', () => {
      expect(formatDate(testCreationDate, 'eeee dd MMMM yyyy')).to.equal(
        'Monday 10 May 2021'
      );
    });
  });
});

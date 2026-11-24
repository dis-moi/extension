import { expect } from 'chai';
import { address, integerParameter, parameter, textParameter } from './query';

describe('admin > query', function () {
  describe('parameter', function () {
    it('gives the plain value', function () {
      expect(parameter({ q: 'amazon' }, 'q')).to.equal('amazon');
    });

    it('takes the first value of a repeated parameter', function () {
      expect(parameter({ q: ['un', 'deux'] }, 'q')).to.equal('un');
    });

    it('gives undefined for a missing parameter or an empty array', function () {
      expect(parameter({}, 'q')).to.equal(undefined);
      expect(parameter({ q: [] }, 'q')).to.equal(undefined);
    });
  });

  describe('textParameter', function () {
    it('gives the empty string rather than undefined', function () {
      expect(textParameter({}, 'q')).to.equal('');
      expect(textParameter({ q: 'amazon' }, 'q')).to.equal('amazon');
    });
  });

  describe('integerParameter', function () {
    it('reads a positive integer', function () {
      expect(integerParameter({ page: '3' }, 'page', 1)).to.equal(3);
    });

    it('falls back to the default for NaN, the empty string and a non-integer', function () {
      expect(integerParameter({ page: 'abc' }, 'page', 1)).to.equal(1);
      expect(integerParameter({ page: '' }, 'page', 1)).to.equal(1);
      expect(integerParameter({ page: '1.5' }, 'page', 1)).to.equal(1);
      expect(integerParameter({ page: '0' }, 'page', 1)).to.equal(1);
      expect(integerParameter({ page: '-2' }, 'page', 1)).to.equal(1);
      expect(integerParameter({}, 'page', 7)).to.equal(7);
    });
  });

  describe('address', function () {
    it('leaves out the empty values', function () {
      expect(
        address('/admin/notices', { tab: 'all', q: undefined, sort: '' }),
      ).to.equal('/admin/notices?tab=all');
    });

    it('gives the bare path when nothing is left', function () {
      expect(address('/admin/notices', { q: undefined })).to.equal(
        '/admin/notices',
      );
    });

    it('applies the changes over the parameters', function () {
      expect(
        address('/admin/notices', { tab: 'all', page: '3' }, { page: '4' }),
      ).to.equal('/admin/notices?tab=all&page=4');
    });

    it('removes a parameter that a change sets to undefined', function () {
      expect(
        address(
          '/admin/notices',
          { tab: 'all', page: '3' },
          { page: undefined },
        ),
      ).to.equal('/admin/notices?tab=all');
    });

    it('escapes the values', function () {
      expect(address('/admin/notices', { q: 'a&b c' })).to.equal(
        '/admin/notices?q=a%26b+c',
      );
    });
  });
});

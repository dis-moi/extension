/* eslint-disable @typescript-eslint/ban-ts-comment, no-unused-expressions */
import { expect } from 'chai';
import { isOptionsTab } from './tab';

describe('domain > tab', () => {
  describe('isOptionsTab', () => {
    it('returns true if given tab is an options tab', () => {
      expect(isOptionsTab({ id: 42, url: 'options', options: true })).to.be
        .true;
    });
    it('returns false if given another kind of tab', () => {
      expect(isOptionsTab({ id: 42, url: 'options' })).to.be.false;
    });
    it('returns false if given null or undefined', () => {
      // @ts-ignore
      expect(isOptionsTab()).to.be.false;
      // @ts-ignore
      expect(isOptionsTab(null)).to.be.false;
    });
  });
});

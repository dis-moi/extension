import { expect } from 'chai';
import { decrementRating, incrementRating } from './notice';

describe('domain > notice', () => {
  describe('incrementRating', () => {
    it('return the rating plus one', () => {
      expect(incrementRating(5)).to.equals(6);
    });
    it('return 1 even if rating is not defined', () => {
      expect(incrementRating()).to.equals(1);
    });
  });
  describe('decrementRating', () => {
    it('return the rating minus one', () => {
      expect(decrementRating(5)).to.equals(4);
    });
    it('return 0 even if rating is not defined', () => {
      expect(decrementRating()).to.equals(0);
    });
  });
});

import chai from 'chai';
import isEmail from 'libs/utils/isEmail';

const expect = chai.expect;

describe('isEmail', function() {
  it('returns false if falsy', () => {
    // @ts-ignore
    expect(isEmail()).to.eq(false);
    // @ts-ignore
    expect(isEmail(null)).to.eq(false);
    expect(isEmail('')).to.eq(false);
  });
  it('returns false for "some words"', () => {
    expect(isEmail('some words')).to.eq(false);
  });
  it('returns false for "http://some.site"', () => {
    expect(isEmail('http://some.site')).to.eq(false);
  });
  it('returns false for "some @email.com"', () => {
    expect(isEmail('some @email.com')).to.eq(false);
  });
  it('returns true for "some@email.com"', () => {
    expect(isEmail('some@email.com')).to.eq(true);
  });
  it('returns true for "s@e.co"', () => {
    expect(isEmail('s@e.co')).to.eq(true);
  });
});

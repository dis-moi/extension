import { expect } from 'chai';
import areWithinHours from './areWithinHours';

describe('areWithinHours', function() {
  it('returns true if the first date is within the last 4 hours of the second date', function() {
    const result = areWithinHours(
      new Date(2014, 8 /* Sep */, 4, 9, 30),
      new Date(2014, 8 /* Sep */, 4, 6, 0),
      4
    );
    // eslint-disable-next-line
    expect(result).to.be.true;
  });

  it('returns true if the first date is before the second date', function() {
    const result = areWithinHours(
      new Date(2014, 8 /* Sep */, 4, 6, 0),
      new Date(2014, 8 /* Sep */, 4, 5, 0),
      4
    );
    // eslint-disable-next-line
    expect(result).to.be.true;
  });

  it('returns false if the second date is past the last 4 hours of the first date', function() {
    const result = areWithinHours(
      new Date(2014, 8 /* Sep */, 4, 10, 15),
      new Date(2014, 8 /* Sep */, 4, 6, 0),
      4
    );
    // eslint-disable-next-line
    expect(result).to.be.false;
  });

  it('returns false if the second date is past the 4 hours and 1 second of the first date', function() {
    const result = areWithinHours(
      new Date(2014, 8 /* Sep */, 4, 10, 0, 1),
      new Date(2014, 8 /* Sep */, 4, 6, 0),
      4
    );
    // eslint-disable-next-line
    expect(result).to.be.false;
  });
});

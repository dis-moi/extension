import chai from 'chai';

import makeInitialState from '../../../src/app/store/makeInitialState';

const expect = chai.expect;

describe('makeInitialState', function () {
  it('init structure', function () {
    expect(makeInitialState()).to.be.empty;
  });
});
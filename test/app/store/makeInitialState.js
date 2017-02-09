import chai from 'chai';

import makeInitialState from '../../../src/app/background/store/makeInitialState';

const expect = chai.expect;

describe('makeInitialState', function () {
  it('init structure', function () {
    expect(makeInitialState()).to.not.be.empty;
  });
});
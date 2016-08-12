import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import makeInitialState from '../../../src/app/store/makeInitialState';

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('makeInitialState', function () {
  it('init structure', function () {
    expect(makeInitialState()).to.be.empty;
  });
});
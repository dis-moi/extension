import chai from 'chai';

import {receivedMatchingContexts} from '../../src/app/actions/kraftBackend';

const expect = chai.expect;

describe('background actions', function () {

  it('receivedMatchingContexts', () => {
    const matchingContexts = {}
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.matchingContexts).to.equal(matchingContexts);
  })
    
});
import chai from 'chai';

import {receivedMatchingContexts} from '../../src/app/actions/kraftBackend';

const expect = chai.expect;

describe('background actions', function () {

  it('receivedMatchingContexts', () => {
    const details = {}
    const action = receivedMatchingContexts(details);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.payload).to.eql(details);
  })
    
});
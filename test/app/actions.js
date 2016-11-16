import chai from 'chai';

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors,
} from '../../src/app/actions/kraftBackend';

const expect = chai.expect;

describe('background actions', function () {

  it('receivedMatchingContexts', () => {
    const matchingContexts = [{}, {}];
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.matchingContexts).to.equal(matchingContexts);
  });

  it('receivedCriteria', () => {
    const criteria = [{}, {}];
    const action = receivedCriteria(criteria);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.criteria).to.equal(criteria);
  });

  it('receivedEditors', () => {
    const editors = [{}, {}];
    const action = receivedEditors(editors);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.editors).to.equal(editors);
  });

});
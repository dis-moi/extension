import chai from 'chai';

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors,
  makeUrlFromFilters
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

describe('background makeUrlFromFilters', function () {
  it('only criteria', () => {
    const criteria = ['crit1', 'crit2'];
    const url = makeUrlFromFilters(criteria, []);

    expect(url).to.be.a('string')
    expect(url.split('?')[1]).to.equal('criteria=crit1,crit2');
  });

  it('only editors', () => {
    const editors = ['edit1', 'edit2'];
    const url = makeUrlFromFilters([], editors);

    expect(url).to.be.a('string')
    expect(url.split('?')[1]).to.equal('excluded_editors=edit1,edit2');
  });

  it('criteria and editors', () => {
    const criteria = ['crit1', 'crit2'];
    const editors = ['edit1', 'edit2'];
    const url = makeUrlFromFilters(criteria, editors);

    expect(url).to.be.a('string')
    expect(url.split('?')[1]).to.equal('criteria=crit1,crit2&excluded_editors=edit1,edit2');
  });
});

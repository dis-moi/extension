import chai from 'chai';

import neverThrowingObject from '../../infrastructure/neverThrowingObject';

import recommendationFound from '../../../src/app/content/actions/recommendations';
import prepareUIEvents from '../../../src/app/content/actions/ui';
import preparePrefEvents from '../../../src/app/content/actions/preferences';

const expect = chai.expect;

const {reduce, extend, deactivate} = prepareUIEvents(neverThrowingObject());
const { updateCriteria, updateEditors } = preparePrefEvents(neverThrowingObject());

describe('content actions', function () {

  it('recommendationFound', () => {
    const recos = [{}, {}];
    const mmc = [{}, {}];
    const action = recommendationFound(neverThrowingObject())(recos, mmc);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.recommendations).to.equal(recos);
    expect(action.matchingContexts).to.equal(mmc);
  });

  it('reduce', () => {
    const action = reduce();

    expect(action.type).to.be.a('string').of.length.above(5);
  });

  it('extend', () => {
    const action = extend();

    expect(action.type).to.be.a('string').of.length.above(5);
  });

  it('deactivate', () => {
    const details = {};
    const action = deactivate(details);

    expect(action.type).to.be.a('string').of.length.above(5);
  });

  it('update criteria', () => {
    const criteria = {};
    const action = updateCriteria(criteria);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.criteria).to.equal(criteria);
  });

  it('update editor', () => {
    const editors = {};
    const action = updateEditors(editors);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.editors).to.equal(editors);
  });

});
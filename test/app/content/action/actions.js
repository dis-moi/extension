import chai from 'chai';

import neverThrowingObject from '../../../infrastructure/neverThrowingObject';

import alternativeFound from '../../../../src/app/content/actions/alternatives';
import prepareUIEvents from '../../../../src/app/content/actions/ui';

const expect = chai.expect;

const {reduce, extend, deactivate} = prepareUIEvents(neverThrowingObject());


describe('content actions', function () {

  it('alternativeFound', () => {
    const alternative = {}
    const action = alternativeFound(alternative);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.alternative).to.equal(alternative);
  })

  it('reduce', () => {
    const action = reduce();

    expect(action.type).to.be.a('string').of.length.above(5);
  })

  it('extend', () => {
    const action = extend();

    expect(action.type).to.be.a('string').of.length.above(5);
  })

  it('deactivate', () => {
    const details = {}
    const action = deactivate(details);

    expect(action.type).to.be.a('string').of.length.above(5);
  })

    
});
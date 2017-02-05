import chai from 'chai';

import { Set as ImmutableSet } from 'immutable';

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors
} from '../../src/app/background/actions/kraftBackend';

import {
  contextTriggered,
  recoDisplayed,
  recoDismissed
} from '../../src/app/background/actions/tabs';

const expect = chai.expect;

describe('background actions', function () {

  it('receivedMatchingContexts', () => {
    const matchingContexts = [{}, {}];
    const action = receivedMatchingContexts(matchingContexts);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.matchingContexts).to.be.an.instanceof(ImmutableSet);
    expect(action.matchingContexts.size).to.equal(matchingContexts.length);
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
  
  it('contextTriggered', () => {
    const trigger = '';
    const triggeredContexts = [];
    const action = contextTriggered(trigger, triggeredContexts);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.trigger).to.equal(trigger);
    expect(action.triggeredContexts).to.equal(triggeredContexts);
  });

  it('recoDisplayed', () => {
    const trigger = '';
    const recommendation = {};
    const action = recoDisplayed(trigger, recommendation);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.trigger).to.equal(trigger);
    expect(action.recommendation).to.equal(recommendation);
  });

  it('recoDismissed', () => {
    const trigger = '';
    const recommendation = {};
    const action = recoDismissed(trigger, recommendation);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.trigger).to.equal(trigger);
    expect(action.recommendation).to.equal(recommendation);
  });

});

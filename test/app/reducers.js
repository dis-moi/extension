import chai from 'chai';
import neverThrowingObject from '../infrastructure/neverThrowingObject';

import { Map as ImmutableMap } from 'immutable';

import reducer from '../../src/app/reducers/';

import makeInitialState from '../../src/app/store/makeInitialState';

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors,
} from '../../src/app/actions/kraftBackend';

import prepareUIEvents from '../../src/app/content/actions/ui';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../../src/app/constants/preferences';


const expect = chai.expect;

const {deactivate} = prepareUIEvents(neverThrowingObject());


describe('background reducer', function () {

  it('initial state + receivedMatchingContexts => state with offers', () => {
    const matchingContexts = [{}, {}];
    const action = receivedMatchingContexts(matchingContexts);

    const nextState = reducer( makeInitialState(), action );

    expect(nextState.matchingContexts).to.equal(matchingContexts);
  });

  it('initial state + criteria => state with criteria', () => {
    const criteria = new ImmutableMap();
    const action = receivedCriteria(criteria);

    const nextState = reducer( makeInitialState(), action );

    expect(nextState.criteria).to.equal(criteria);
  });

  it('initial state + editors => state with editors', () => {
    const editors = new ImmutableMap();
    const action = receivedEditors(editors);

    const nextState = reducer( makeInitialState(), action );

    expect(nextState.editors).to.equal(editors);
  });

  it('initial state + deactivate (everywhere) => state with deactivated pref', () => {
    const action = deactivate({
      where: DEACTIVATE_EVERYWHERE,
      duration: 1000
    });

    const nextState = reducer( makeInitialState(), action );

    expect(nextState.preferences.deactivated.deactivatedEverywhereUntil).to.be.above(Date.now());
  });

  it('initial state + deactivate (a website always) => state with deactivated pref', () => {
    const action = deactivate({
      where: 'soundcloud.com',
      duration: DEACTIVATE_WEBSITE_ALWAYS
    });

    const nextState = reducer( makeInitialState(), action );

    expect(nextState.preferences.deactivated.deactivatedWebsites.has(action.where)).to.be.true;
  });
    
});
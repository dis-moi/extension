import chai from 'chai';
import neverThrowingObject from '../infrastructure/neverThrowingObject';

import { Map as ImmutableMap, Set as ImmutableSet, fromJS } from 'immutable';

import prefsReducer from '../../src/app/reducers/prefs';
import notPrefsReducer from '../../src/app/reducers/notPrefs';

import makeInitialState from '../../src/app/store/makeInitialState';

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors,
} from '../../src/app/actions/kraftBackend';

import prepareUIEvents from '../../src/app/content/actions/ui';
import prepareFilterEvents from '../../src/app/content/actions/filters';
import prepareRecoEvents from '../../src/app/content/actions/recommendations';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../../src/app/constants/websites';

const expect = chai.expect;

const { deactivate } = prepareUIEvents(neverThrowingObject());
const { excludeEditor, includeEditor } = prepareFilterEvents(neverThrowingObject());
const { dismissReco, approveReco, unapproveReco, reportReco } = prepareRecoEvents(neverThrowingObject());


describe('background reducer', function () {

  it('initial state + receivedMatchingContexts => state with offers', () => {
    const matchingContexts = [{}, {}];
    const action = receivedMatchingContexts(matchingContexts);

    const nextState = notPrefsReducer( makeInitialState().get('notPrefs'), action );
    
    expect(action.matchingContexts).to.be.an.instanceof(ImmutableSet);
    expect(nextState.get('matchingContexts')).to.have.size(matchingContexts.length);
  });

  it('initial state + criteria => state with criteria', () => {
    const criteria = new ImmutableMap({crit1: new ImmutableMap({slug: 'crit1'})});
    const action = receivedCriteria(criteria);

    const nextState = prefsReducer( makeInitialState().get('prefs'), action );

    expect(nextState.get('criteria')).to.have.size(1);
    expect(nextState.get('criteria').get('crit1').get('slug')).to.equal('crit1');
    expect(nextState.get('criteria').get('crit1').get('isSelected')).to.equal(true);
  });

  it('state with criteria + new criteria => state with memory of initial criteria', () => {
    const criteria = new ImmutableMap({crit2: new ImmutableMap({slug: 'crit2'})});
    const action = receivedCriteria(criteria);

    const nextState = prefsReducer(
      fromJS({
        criteria: {
          crit1: {
            slug: 'crit1',
            isSelected: false
          }
        }
      }),
      action);

    expect(nextState.get('criteria')).to.have.size(2);
    expect(nextState.get('criteria').get('crit1').get('isSelected')).to.equal(false);
    expect(nextState.get('criteria').get('crit2').get('isSelected')).to.equal(true);
  });

  it('initial state + editors => state with editors', () => {
    const editors = new ImmutableMap({1: new ImmutableMap({id: 1})});
    const action = receivedEditors(editors);

    const nextState = prefsReducer( makeInitialState().get('prefs'), action );

    expect(nextState.get('editors')).to.have.size(1);
    expect(nextState.get('editors').get('1').get('id')).to.equal(1);
    expect(nextState.get('editors').get('1').get('isExcluded')).to.equal(false);
  });

  it('state with editors + new editors => state with memory of initial editors', () => {
    const editors = new ImmutableMap({2: new ImmutableMap({id: 2})});
    const action = receivedEditors(editors);

    const nextState = prefsReducer(
      fromJS({
        'editors': {
          1: {
            id: 1,
            isExcluded: true
          }
        }
      }),
      action);

    expect(nextState.get('editors')).to.have.size(2);
    expect(nextState.get('editors').get('1').get('isExcluded')).to.equal(true);
    expect(nextState.get('editors').get('2').get('isExcluded')).to.equal(false);
  });

  it('initial state + deactivate (everywhere) => state with deactivated pref', () => {
    const action = deactivate({
      where: DEACTIVATE_EVERYWHERE,
      duration: 1000
    });

    const nextState = prefsReducer( makeInitialState().get('prefs'), action );

    expect(nextState.get('websites').get('deactivated').get('everywhereUntil')).to.be.above(Date.now());
  });

  it('exclude editor', () => {
    const action = excludeEditor(1);

    const nextState = prefsReducer(
      fromJS({
        'editors': {
          "1": {
            id: 1,
            'isExcluded': false
          }
        }
      }),
      action);

    expect(nextState.get('editors')).to.have.size(1);
    expect(nextState.get('editors').get('1').get('isExcluded')).to.be.true;
  });
  
  it('include editor', () => {
    const action = includeEditor(1);

    const nextState = prefsReducer(
      fromJS({
        'editors': {
          "1": {
            id: 1,
            'isExcluded': true
          }
        }
      }),
      action );

    expect(nextState.get('editors')).to.have.size(1);
    expect(nextState.get('editors').get('1').get('isExcluded')).to.be.false;
  });

  it('dismiss reco', () => {
    const action = dismissReco(1);

    const nextState = prefsReducer(
      fromJS({'dismissedRecos': new ImmutableSet()}),
      action );

    expect(nextState.get('dismissedRecos')).to.have.size(1);
  });
  
  it('approve reco', () => {
    const action = approveReco(1);

    const nextState = prefsReducer(
      fromJS({ 'approvedRecos': new ImmutableSet()}),
      action );

    expect(nextState.get('approvedRecos')).to.have.size(1);
  });

  it('unapprove reco', () => {
    const action = unapproveReco(42);

    const nextState = prefsReducer(
      fromJS({ 'approvedRecos': new ImmutableSet([42])}),
      action );

    expect(nextState.get('approvedRecos')).to.have.size(0);
  });

  it('report reco', () => {
    const action = reportReco(1);

    const nextState = prefsReducer(
      fromJS({'dismissedRecos': new ImmutableSet()}),
      action );

    expect(nextState.get('dismissedRecos')).to.have.size(1);
  });

});
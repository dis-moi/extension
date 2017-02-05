import { Map as ImmutableMap, OrderedMap } from 'immutable';

let migrations = new OrderedMap();

// 26-01-2017
migrations = migrations.set('2017-01-26', (previousState, defaultState) => {

  let newState = previousState;

  if (!previousState.hasIn(['prefs', 'websites']))
  // prefs.websites <= websites
    newState = newState.setIn(['prefs', 'websites'], previousState.get('websites') 
      || defaultState.getIn(['prefs', 'websites']));

  if (!previousState.hasIn(['prefs', 'criteria']))
  // prefs.criteria <= criteria
    newState = newState.setIn(['prefs', 'criteria'], previousState.get('criteria') 
      || defaultState.getIn(['prefs', 'criteria']));

  if (!previousState.hasIn(['prefs', 'editors']))
  // prefs.editors <= editors
    newState = newState.setIn(['prefs', 'editors'], previousState.get('editors') 
      || defaultState.getIn(['prefs', 'editors']));

  if (!previousState.hasIn(['prefs', 'dismissedRecos']))
  // prefs.dismissedRecos <= dismissedRecos
    newState = newState.setIn(['prefs', 'dismissedRecos'], previousState.get('dismissedRecos') 
      || defaultState.getIn(['prefs', 'dismissedRecos']));

  if (!previousState.hasIn(['prefs', 'approvedRecos']))
  // prefs.approvedRecos <= approvedRecos
    newState = newState.setIn(['prefs', 'approvedRecos'], previousState.get('approvedRecos') 
      || defaultState.getIn(['prefs', 'approvedRecos']));

  if (!previousState.hasIn(['prefs', 'onInstalledDetails']))
  // prefs.onInstalledDetails <= onInstalledDetails
    newState = newState.setIn(['prefs', 'onInstalledDetails'], previousState.get('onInstalledDetails') 
      || defaultState.getIn(['prefs', 'onInstalledDetails']));

  return newState;
});

// ADD NEW MIGRATIONS HEREUNDER
// ...

export default (previousState, defaultState) => {
  return previousState !== undefined ?
    migrations.reduce((migratedState, migrate, date) => {
      return migrate(migratedState, defaultState);  
    }, previousState)
    : defaultState;
};

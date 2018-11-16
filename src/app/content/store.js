import { createStore } from 'redux';
import { Record, Map as ImmutableMap } from 'immutable';
import rootReducer from './reducers';

export default createStore(
  rootReducer,
  new Record({
    open: true,
    reduced: true,
    preferenceScreenPanel: undefined, // preference screen close
    recommendations: undefined,
    onInstalledDetails: new ImmutableMap(),
    criteria: new ImmutableMap(),
    editors: new ImmutableMap(),
  })()
);

import { combineReducers } from 'redux-immutable';
import prefs from './prefs';
import resources from './resources';
import tabs from './tabs';

export default combineReducers({
  prefs,
  resources,
  tabs,
});
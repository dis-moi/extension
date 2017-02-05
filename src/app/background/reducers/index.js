import { combineReducers } from 'redux-immutable';
import prefs from './prefs';
import resources from './resources';

export default combineReducers({
  prefs,
  resources
});
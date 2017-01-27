import { combineReducers } from 'redux-immutable';
import prefs from './prefs';
import notPrefs from './notPrefs';

export default combineReducers({
  prefs,
  notPrefs
});
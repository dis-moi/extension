import { combineReducers } from 'redux';
import prefs from './prefs';
import notPrefs from './notPrefs';

export default combineReducers({
  prefs,
  notPrefs
});
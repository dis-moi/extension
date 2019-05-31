import { combineReducers } from 'redux';
import prefs, { PrefsState } from './prefs';
import resources, { ResourcesState } from './resources';
import tabs, { TabsState } from './tabs';

export interface BackgroundState {
  prefs: PrefsState;
  resources: ResourcesState;
  tabs: TabsState;
}

export default combineReducers({
  prefs,
  resources,
  tabs
});

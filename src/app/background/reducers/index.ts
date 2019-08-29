import { combineReducers } from 'redux';
import prefs, { PrefsState } from './prefs';
import resources, { ResourcesState } from './resources';
import tabs, { TabsState } from './tabs';
import { PersistedState } from 'redux-persist/es/types';

export interface PersistedBackgroundState extends PersistedState {
  prefs: PrefsState;
}

export interface BackgroundState extends PersistedBackgroundState {
  resources: ResourcesState;
  tabs: TabsState;
}

export default combineReducers({
  prefs,
  resources,
  tabs
});

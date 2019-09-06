import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist';
import prefsReducer, { PrefsState } from './prefs.reducer';
import resourcesReducer, { ResourcesState } from './resources.reducer';
import tabsReducer, { TabsState } from './tabs.reducer';
import subscriptionsReducer, {
  SubscriptionsState
} from './subscriptions.reducer';

export interface PersistedBackgroundState extends PersistedState {
  prefs: PrefsState;
}

export interface BackgroundState extends PersistedBackgroundState {
  resources: ResourcesState;
  tabs: TabsState;
  subscriptions: SubscriptionsState;
}

export default combineReducers({
  prefs: prefsReducer,
  resources: resourcesReducer,
  tabs: tabsReducer,
  subscriptions: subscriptionsReducer
});

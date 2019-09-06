import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist/es/types';
import prefsReducer, { PrefsState } from './prefs.reducer';
import resourcesReducer, { ResourcesState } from './resources.reducer';
import tabsReducer, { TabsState } from './tabs.reducer';
import subscriptionsReducer, {
  SubscriptionsState
} from './subscriptions.reducer';

export interface BackgroundState extends PersistedState {
  prefs: PrefsState;
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

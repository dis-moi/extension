import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist';
import prefs, { PrefsState } from './prefs.reducer';
import installationDetails, {
  InstallationDetailsState
} from './installationDetails';
import resources, { ResourcesState } from './resources.reducer';
import tabs, { TabsState } from './tabs.reducer';
import subscriptions, { SubscriptionsState } from './subscriptions.reducer';
import user, { UserState } from './user';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';

export interface PersistedBackgroundState extends PersistedState {
  prefs: PrefsState;
  installationDetails: InstallationDetailsState;
  serviceMessage: ServiceMessageState;
  subscriptions: SubscriptionsState;
  user: UserState;
}

export interface BackgroundState extends PersistedBackgroundState {
  resources: ResourcesState;
  tabs: TabsState;
}

export default combineReducers({
  prefs,
  installationDetails,
  resources,
  tabs,
  subscriptions,
  user,
  serviceMessage
});

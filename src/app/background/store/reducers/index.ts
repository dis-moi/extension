import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist';
import installationDetails, {
  InstallationDetailsState
} from 'libs/store/reducers/installationDetails';
import prefs, { PrefsState } from './prefs.reducer';
import resources, { ResourcesState } from './resources';
import tabs, { TabsState } from './tabs.reducer';
import subscriptions, { SubscriptionsState } from './subscriptions.reducer';
import user, { UserState } from './user';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';

export interface StateWithSubscriptions {
  subscriptions: SubscriptionsState;
}

export interface PersistedBackgroundState
  extends PersistedState,
    StateWithSubscriptions {
  prefs: PrefsState;
  installationDetails: InstallationDetailsState;
  serviceMessage: ServiceMessageState;
  user: UserState;
}

export interface StateWithResources {
  resources: ResourcesState;
}

export interface StateWithTabs {
  tabs: TabsState;
}

export interface BackgroundState
  extends PersistedBackgroundState,
    StateWithResources,
    StateWithTabs {}

export default combineReducers({
  prefs,
  installationDetails,
  resources,
  tabs,
  subscriptions,
  user,
  serviceMessage
});

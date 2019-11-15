import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist';
import prefs, { PrefsState } from './prefs.reducer';
import installationDetails, {
  InstallationDetailsState
} from './installationDetails';
import resources, { ResourcesState } from './resources.reducer';
import tabs, { TabsState } from './tabs.reducer';
import subscriptions, { SubscriptionsState } from './subscriptions.reducer';
import bullesUpdate, { BullesUpdateState } from './bullesUpdate.reducer';
import user, { UserState } from './user';

export interface PersistedBackgroundState extends PersistedState {
  prefs: PrefsState;
  installationDetails: InstallationDetailsState;
  bullesUpdate: BullesUpdateState;
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
  bullesUpdate,
  user
});

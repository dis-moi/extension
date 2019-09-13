import { combineReducers } from 'redux';
import { PersistedState } from 'redux-persist';
import prefs, { PrefsState } from './prefs.reducer';
import installationDetails, {
  InstallationDetailsState
} from './installationDetails';
import resources, { ResourcesState } from './resources.reducer';
import tabs, { TabsState } from './tabs.reducer';
import subscriptions, { SubscriptionsState } from './subscriptions.reducer';
import bullesUpgrade, { BullesUpgradeState } from './bullesUpgrade.reducer';

export interface PersistedBackgroundState extends PersistedState {
  prefs: PrefsState;
  installationDetails: InstallationDetailsState;
  bullesUpgrade: BullesUpgradeState;
  subscriptions: SubscriptionsState;
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
  bullesUpgrade
});

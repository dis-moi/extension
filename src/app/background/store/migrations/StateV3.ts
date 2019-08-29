import { InstallationDetails } from '../../../lmem/installation';
import { PersistedState } from 'redux-persist/es/types';

interface StateV3Prefs {
  installationDetails: InstallationDetails;
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  readNotices?: number[];
}

export interface StateV3 extends PersistedState {
  prefs: StateV3Prefs;
}

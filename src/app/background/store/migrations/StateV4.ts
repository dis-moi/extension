import { InstallationDetails } from '../../../lmem/installation';
import { PersistedState } from 'redux-persist/es/types';

interface StateV4Prefs {
  installationDetails: InstallationDetails;
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  markedReadNotices?: number[];
}

export interface StateV4 extends PersistedState {
  prefs: StateV4Prefs;
}

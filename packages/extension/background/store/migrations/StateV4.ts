import { PersistedState } from 'redux-persist/es/types';

interface InstallationDetailsV4 {
  datetime?: Date;
  version: string;
}

interface StateV4Prefs {
  installationDetails: InstallationDetailsV4;
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  markedReadNotices?: number[];
}

export interface StateV4 extends PersistedState {
  prefs: StateV4Prefs;
}

import { PersistedState } from 'redux-persist/es/types';

interface InstallationDetailsV3 {
  datetime?: Date;
  version: string;
}

interface StateV3Prefs {
  installationDetails: InstallationDetailsV3;
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  readNotices?: number[];
}

export interface StateV3 extends PersistedState {
  prefs: StateV3Prefs;
}

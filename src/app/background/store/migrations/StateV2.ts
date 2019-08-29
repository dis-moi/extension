import { Criteria } from '../../../lmem/criterion';
import { InstallationDetails } from '../../../lmem/installation';
import { PersistedState } from 'redux-persist/es/types';

interface StateV2Prefs {
  websites: unknown;
  criteria: Criteria;
  editors: { [id: number]: unknown };
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  onInstalledDetails: InstallationDetails;
}

export interface StateV2 extends PersistedState {
  prefs: StateV2Prefs;
}

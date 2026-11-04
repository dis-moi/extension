import { PersistedState } from 'redux-persist/es/types';
import { Criteria } from '@dismoi/domain/criterion';
import { InstallationDetails } from '@dismoi/domain/installation';

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

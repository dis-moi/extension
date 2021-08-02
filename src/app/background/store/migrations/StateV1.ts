import { PersistedState } from 'redux-persist/es/types';
import { Criteria } from 'libs/domain/criterion';
import { InstallationDetails } from 'libs/domain/installation';

interface StateV1Prefs {
  websites: unknown;
  criteria: Criteria;
  editors: { [id: number]: unknown };
  dismissedRecos?: number[];
  approvedRecos?: number[];
  dismissedNotices?: number[];
  likedNotices?: number[];
  dislikedNotices?: number[];
  onInstalledDetails: InstallationDetails;
}
export interface StateV1orV2 extends PersistedState {
  prefs: StateV1Prefs;
}

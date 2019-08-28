import { Criteria } from '../../../lmem/criterion';
import { InstallationDetails } from '../../../lmem/installation';
import { PersistedState } from 'redux-persist/es/types';

interface StateV1Prefs {
  websites: any;
  criteria: Criteria;
  editors: { [id: number]: any };
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

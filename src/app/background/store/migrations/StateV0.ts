import { PersistedState } from 'redux-persist/es/types';
import { Criteria } from '../../../lmem/criterion';
import { InstallationDetails } from '../../../lmem/installation';

export interface StateV0V1orV2 extends PersistedState {
  prefs?: {
    websites: unknown;
    criteria: Criteria;
    editors: { [id: number]: unknown };
    dismissedRecos: number[];
    approvedRecos: number[];
    onInstalledDetails: InstallationDetails;
  };
  websites?: unknown;
  criteria?: Criteria;
  editors?: { [id: number]: unknown };
  dismissedRecos?: number[];
  approvedRecos?: number[];
  dismissedNotices?: number[];
  likedNotices?: number[];
  dislikedNotices?: number[];
  onInstalledDetails?: InstallationDetails;
}

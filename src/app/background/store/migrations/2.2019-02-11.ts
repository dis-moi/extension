import { PersistedState } from 'redux-persist/es/types';
import * as R from 'ramda';
import { StateV2 } from './StateV2';
import { StateV1orV2 } from './StateV1';

export const migration2 = (persistedState: PersistedState): StateV2 => {
  const previousState = persistedState as StateV1orV2;

  return R.compose(
    R.assocPath(
      ['prefs', 'dismissedNotices'],
      previousState.prefs.dismissedRecos ||
        previousState.prefs.dismissedNotices ||
        []
    ),
    R.assocPath(
      ['prefs', 'likedNotices'],
      previousState.prefs.approvedRecos ||
        previousState.prefs.likedNotices ||
        []
    ),
    R.assocPath(
      ['prefs', 'dismissedNotices'],
      previousState.prefs.dismissedNotices || []
    ),
    R.dissocPath(['prefs', 'dismissedRecos']),
    R.dissocPath(['prefs', 'approvedRecos'])
  )(previousState) as StateV2;
};

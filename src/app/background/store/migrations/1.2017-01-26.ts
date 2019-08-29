import { PersistedState } from 'redux-persist/es/types';
import * as R from 'ramda';
import { StateV1orV2 } from './StateV1';
import { StateV0V1orV2 } from './StateV0';

export const migration1 = (persistedState: PersistedState): StateV1orV2 => {
  const previousState: StateV0V1orV2 = persistedState as StateV0V1orV2;

  return R.compose(
    R.compose(
      R.assocPath(
        ['prefs', 'websites'],
        previousState && previousState.prefs
          ? previousState.prefs.websites
          : previousState.websites || []
      ),
      R.assocPath(
        ['prefs', 'criteria'],
        previousState && previousState.prefs
          ? previousState.prefs.criteria
          : previousState.criteria || []
      ),
      R.assocPath(
        ['prefs', 'editors'],
        previousState && previousState.prefs
          ? previousState.prefs.editors
          : previousState.editors || []
      ),
      R.assocPath(
        ['prefs', 'dismissedRecos'],
        previousState && previousState.prefs
          ? previousState.prefs.dismissedRecos
          : previousState.dismissedRecos || []
      ),
      R.assocPath(
        ['prefs', 'approvedRecos'],
        previousState && previousState.prefs
          ? previousState.prefs.approvedRecos
          : previousState.approvedRecos || []
      ),
      R.assocPath(
        ['prefs', 'onInstalledDetails'],
        previousState && previousState.prefs
          ? previousState.prefs.onInstalledDetails
          : previousState.onInstalledDetails || []
      )
    ),
    R.compose(
      R.dissoc('websites'),
      R.dissoc('criteria'),
      R.dissoc('editors'),
      R.dissoc('dismissedRecos'),
      R.dissoc('approvedRecos'),
      R.dissoc('onInstalledDetails')
    )
  )(previousState) as StateV1orV2;
};

import { PersistedState } from 'redux-persist/es/types';
import * as R from 'ramda';
import { StateV3 } from './StateV3';
import { StateV2 } from './StateV2';

export const migration3 = (persistedState: PersistedState): StateV3 => {
  const previousState = persistedState as StateV2;

  return R.compose(
    R.assocPath(
      ['prefs', 'installationDetails'],
      previousState.prefs.onInstalledDetails
    ),
    R.dissocPath(['prefs', 'websites'])
  )(previousState) as StateV3;
};

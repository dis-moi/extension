import { PersistedState } from 'redux-persist';
import * as RA from 'ramda-adjunct';
import { PersistedBackgroundState } from '../../reducers';
import { StateV3 } from './StateV3';
import { overPrefs } from './helpers';

export const migration4 = (
  persistedState: PersistedState
): PersistedBackgroundState => {
  const previousState = persistedState as StateV3;

  return (overPrefs(
    RA.renameKeys({ readNotices: 'markedReadNotices' }),
    previousState
  ) as unknown) as PersistedBackgroundState; // Ramda-adjunct TypeScript definition wrongfuly assumes renameKeys input and output is the same type. There is room for improvement
};

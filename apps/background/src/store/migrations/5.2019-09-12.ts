import { PersistedState } from 'redux-persist/es/types';
import { PersistedBackgroundState } from '../reducers';
import * as RA from 'ramda-adjunct';
import { StateV4 } from './StateV4';
import { overPrefs } from './helpers';

export const migration5 = (
  persistedState: PersistedState
): PersistedBackgroundState => {
  const previousState = persistedState as StateV4;

  return (overPrefs(
    RA.renameKeys({ markedReadNotices: 'readNotices' }),
    previousState
  ) as unknown) as PersistedBackgroundState; // Ramda-adjunct TypeScript definition wrongfuly assumes renameKeys input and output is the same type. There is room for improvement
};

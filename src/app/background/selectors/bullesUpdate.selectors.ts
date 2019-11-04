import { createSelector } from 'reselect';
import * as R from 'ramda';
import { BackgroundState } from '../reducers';
import { BullesUpdateState } from '../reducers/bullesUpdate.reducer';

const getBullesUpdateState = (state: BackgroundState): BullesUpdateState =>
  state.bullesUpdate;

export const getUpdateMessageLastShowDate = createSelector(
  [getBullesUpdateState],
  R.prop('lastUpdateMessageShowDate')
);

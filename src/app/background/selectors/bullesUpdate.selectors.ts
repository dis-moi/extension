import { createSelector } from 'reselect';
import * as R from 'ramda';
import {
  BullesUpdateState,
  BullesUpdateStateSlice
} from '../reducers/bullesUpdate.reducer';

const getBullesUpdateState = (
  state: BullesUpdateStateSlice
): BullesUpdateState => state.bullesUpdate;

export const getUpdateMessageLastShowDate = createSelector(
  [getBullesUpdateState],
  R.prop('lastUpdateMessageShowDate')
);

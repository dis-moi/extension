import { createSelector } from 'reselect';
import * as R from 'ramda';
import { BackgroundState } from '../reducers';
import { BullesUpgradeState } from '../reducers/bullesUpgrade.reducer';

const getBullesUpgradeState = (state: BackgroundState): BullesUpgradeState =>
  state.bullesUpgrade;

export const getUpgradeMessageLastShowDate = createSelector(
  [getBullesUpgradeState],
  R.prop('lastServiceMessageShowDate')
);

import { getLocation } from 'connected-react-router';
import { Location } from 'history';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { OptionsScreen } from '../../screens';
import { OptionsState } from '../reducers';

export const getCurrentScreen = createSelector<
  OptionsState,
  Location,
  OptionsScreen | null
>(
  [getLocation],
  ({ pathname }) => {
    if (pathname.includes('settings')) {
      return R.compose(
        R.last,
        R.split('/')
      )(pathname) as OptionsScreen;
    }
    return null;
  }
);

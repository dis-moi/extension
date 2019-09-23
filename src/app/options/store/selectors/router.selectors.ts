import { getLocation, RouterRootState } from 'connected-react-router';
import { Location } from 'history';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { OptionsScreen } from '../../screens';

export const getCurrentScreen = createSelector<
  RouterRootState,
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

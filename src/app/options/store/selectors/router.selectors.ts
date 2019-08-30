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
    if (pathname === '/subscriptions' || pathname === '/suggestions') {
      return R.tail(pathname) as OptionsScreen;
    }
    return null;
  }
);

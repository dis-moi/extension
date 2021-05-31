import { createSelector } from 'reselect';
import * as R from 'ramda';
import {
  ServiceMessageState,
  ServiceMessageStateSlice
} from 'app/background/store/reducers/serviceMessage.reducer';

const getServiceMessageState = (
  state: ServiceMessageStateSlice
): ServiceMessageState => state.serviceMessage;

export const getServiceMessageLastShowDate = createSelector(
  [getServiceMessageState],
  R.prop('lastShownDate')
);

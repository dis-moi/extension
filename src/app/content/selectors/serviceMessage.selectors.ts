import { createSelector } from 'reselect';
import * as R from 'ramda';
import { ContentState } from '../store';
import { ServiceMessageState } from '../reducers/serviceMessage.reducer';

export const getServiceMessageState = (
  state: ContentState
): ServiceMessageState => state.serviceMessage;

export const getShowUpdateMessage = createSelector(
  [getServiceMessageState],
  R.prop('showUpdateMessage')
);

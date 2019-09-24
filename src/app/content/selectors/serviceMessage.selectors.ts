import { createSelector } from 'reselect';
import * as R from 'ramda';
import { ServiceMessageState } from '../reducers/serviceMessage.reducer';

export interface StateWithServiceMessage {
  serviceMessage: ServiceMessageState;
}

export const getServiceMessageState = (
  state: StateWithServiceMessage
): ServiceMessageState => state.serviceMessage;

export const getShowUpdateMessage = createSelector(
  [getServiceMessageState],
  R.prop('showUpdateMessage')
);

import { createSelector } from 'reselect';
import * as R from 'ramda';
import { ServiceMessageState } from '../reducers/serviceMessage.reducer';

export interface StateWithServiceMessage {
  serviceMessage: ServiceMessageState;
}

export const getServiceMessageState = (
  state: StateWithServiceMessage
): ServiceMessageState => state.serviceMessage;

export const getServiceMessage = createSelector(
  [getServiceMessageState],
  R.prop('serviceMessage')
);

export const hasServiceMessage = createSelector(
  [getServiceMessage],
  serviceMessage => !!serviceMessage
);

export const getServiceMessageAction = createSelector(
  [getServiceMessageState],
  R.prop('action')
);

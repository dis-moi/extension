import { createSelector } from 'reselect';
import * as R from 'ramda';
import { StateWithServiceMessage } from '../index';
import { ServiceMessageState } from '../reducers/serviceMessage.reducer';

export const getServiceMessageState = (
  state: StateWithServiceMessage
): ServiceMessageState => state.serviceMessage;

export const getServiceMessages = createSelector(
  [getServiceMessageState],
  R.prop('messages')
);

export const hasServiceMessage = createSelector(
  [getServiceMessages],
  serviceMessages => serviceMessages.length > 0
);

export const getServiceMessageAction = createSelector(
  [getServiceMessageState],
  (state: ServiceMessageState) => R.prop('action', state)
);

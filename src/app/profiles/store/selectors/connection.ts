import { ProfilesState } from '../reducers';
import { createSelector } from 'reselect';

export const getConnection = (state: ProfilesState) => state.connection;

export const isConnecting = createSelector(
  [getConnection],
  connection => connection.connecting > 0
);

export const isConnected = createSelector(
  [getConnection],
  connection => connection.connected
);

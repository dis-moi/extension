import { StatusState } from '../reducers/status';
import { createSelector } from 'reselect';

export const selectBackendLinkFailed = ({ status }: { status: StatusState }) =>
  status.backendLinkFailed;

export type ConnectivityStatus = 'FAILED' | 'OK';

export const selectStatus = createSelector(
  [selectBackendLinkFailed],
  backendLinkFailed => (backendLinkFailed ? 'FAILED' : 'OK')
);

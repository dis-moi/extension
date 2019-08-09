import { BaseAction, ErrorAction } from '.';
import { Contributor } from 'app/lmem/contributor';

export interface ReceivedContributorsAction extends BaseAction {
  type: 'api/UPDATE_CONTRIBUTORS';
  payload: { contributors: Contributor[] };
}
export const receivedContributors = (
  contributors: Contributor[]
): ReceivedContributorsAction => ({
  type: 'api/UPDATE_CONTRIBUTORS',
  payload: { contributors },
  meta: { tracked: false }
});

export interface RefreshContributorsFailedAction extends ErrorAction {
  type: 'REFRESH_CONTRIBUTORS_FAILED';
}
export const refreshContributorsFailed = (
  e: Error
): RefreshContributorsFailedAction => ({
  type: 'REFRESH_CONTRIBUTORS_FAILED',
  payload: e,
  error: true
});

export interface ContributorsTransmittedAction extends BaseAction {
  type: 'CONTRIBUTORS_TRANSMITTED';
  payload: { contributors: Contributor[] };
}
export const contributorsTransmitted = (
  contributors: Contributor[]
): ContributorsTransmittedAction => ({
  type: 'CONTRIBUTORS_TRANSMITTED',
  payload: { contributors },
  meta: { tracked: false }
});

import { BaseAction, ErrorAction } from '.';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';

export const UPDATE_CONTRIBUTORS = 'api/UPDATE_CONTRIBUTORS';
export interface ReceivedContributorsAction extends BaseAction {
  type: typeof UPDATE_CONTRIBUTORS;
  payload: { contributors: Contributor[] };
}
export const receivedContributors = (
  contributors: Contributor[]
): ReceivedContributorsAction => ({
  type: UPDATE_CONTRIBUTORS,
  payload: { contributors }
});

export const REFRESH_CONTRIBUTORS_FAILED = 'REFRESH_CONTRIBUTORS_FAILED';
export interface RefreshContributorsFailedAction extends ErrorAction {
  type: typeof REFRESH_CONTRIBUTORS_FAILED;
}
export const refreshContributorsFailed = (
  e: Error
): RefreshContributorsFailedAction => ({
  type: REFRESH_CONTRIBUTORS_FAILED,
  payload: e,
  error: true
});

export const CONTRIBUTORS_TRANSMITTED = 'CONTRIBUTORS_TRANSMITTED';
export interface ContributorsTransmittedAction extends BaseAction {
  type: typeof CONTRIBUTORS_TRANSMITTED;
  payload: { contributors: StatefulContributor[] };
}
export const contributorsTransmitted = (
  contributors: StatefulContributor[]
): ContributorsTransmittedAction => ({
  type: CONTRIBUTORS_TRANSMITTED,
  payload: { contributors }
});

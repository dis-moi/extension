import { ActionMeta, BaseAction, ErrorAction } from 'app/actions';
import { ContributorId, FetchedContributor } from 'app/lmem/contributor';
import { Level } from 'app/utils/Logger';

export const FETCH_CONTRIBUTOR_REQUEST = 'FETCH_CONTRIBUTOR_REQUEST';
export interface FetchContributorRequestAction extends BaseAction {
  type: typeof FETCH_CONTRIBUTOR_REQUEST;
  payload: ContributorId;
}
export const fetchContributorRequest = (
  contributorId: ContributorId,
  meta?: ActionMeta
): FetchContributorRequestAction => ({
  type: FETCH_CONTRIBUTOR_REQUEST,
  payload: contributorId,
  meta
});

export const FETCH_CONTRIBUTOR_SUCCESS = 'FETCH_CONTRIBUTOR_SUCCESS';
export interface FetchContributorSuccessAction extends BaseAction {
  type: typeof FETCH_CONTRIBUTOR_SUCCESS;
  payload: FetchedContributor;
}
export const fetchContributorSuccess = (
  contributor: FetchedContributor,
  meta?: ActionMeta
): FetchContributorSuccessAction => ({
  type: FETCH_CONTRIBUTOR_SUCCESS,
  payload: contributor,
  meta
});

export const FETCH_CONTRIBUTOR_FAILURE = 'FETCH_CONTRIBUTOR_FAILURE';
export interface FetchContributorFailureAction extends ErrorAction {
  type: typeof FETCH_CONTRIBUTOR_FAILURE;
}
export const fetchContributorFailure = (
  e: Error,
  meta?: ActionMeta
): FetchContributorFailureAction => ({
  type: FETCH_CONTRIBUTOR_FAILURE,
  payload: e,
  error: true,
  meta: {
    ...meta,
    severity: Level.ERROR
  }
});

export type FetchContributorAction =
  | FetchContributorRequestAction
  | FetchContributorSuccessAction
  | FetchContributorFailureAction;

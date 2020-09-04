import { BaseAction } from 'app/actions';
import { ContributorId } from 'app/lmem/contributor';

export const FETCH_CONTRIBUTOR_NOTICES = 'FETCH_CONTRIBUTOR_NOTICES';
export interface FetchContributorNoticesAction extends BaseAction {
  type: typeof FETCH_CONTRIBUTOR_NOTICES;
  payload: ContributorId;
}

export const fetchContributorNotices = (
  contributorId: ContributorId
): FetchContributorNoticesAction => ({
  type: FETCH_CONTRIBUTOR_NOTICES,
  payload: contributorId
});

export const FETCH_MORE_CONTRIBUTOR_NOTICES = 'FETCH_MORE_CONTRIBUTOR_NOTICES';
export interface FetchMoreContributorNoticesAction extends BaseAction {
  type: typeof FETCH_MORE_CONTRIBUTOR_NOTICES;
  payload: ContributorId;
}

export const fetchMoreContributorNotices = (
  contributorId: ContributorId
): FetchMoreContributorNoticesAction => ({
  type: FETCH_MORE_CONTRIBUTOR_NOTICES,
  payload: contributorId
});

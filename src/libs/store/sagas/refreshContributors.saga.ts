import { put } from 'redux-saga/effects';
import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';
import {
  receivedContributors,
  refreshContributorsFailed
} from 'libs/store/actions';
import fetchContributors from 'libs/api/fetchContributors';
import { getFacet } from '../../facets/getFacet';
import { Contributor, ContributorId } from '../../domain/contributor';
import { asArray } from '../../utils/env';

const LMEL_CONTRIBUTORS_IDS = asArray<ContributorId>(
  process.env.LMEL_CONTRIBUTORS_IDS
);

const filterLocalContributors = (contributors: Contributor[]): Contributor[] =>
  contributors.filter(c => LMEL_CONTRIBUTORS_IDS.includes(c.id));

export default function* refreshContributorsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 10,
    onError: function*(error: Error) {
      yield put(refreshContributorsFailed(error));
    }
  });
  const contributors = yield callAndRetry(fetchContributors);

  if (contributors) {
    const accessibleContributors =
      getFacet() === 'lmel'
        ? filterLocalContributors(contributors)
        : contributors;

    yield put(receivedContributors(accessibleContributors));
  }
}

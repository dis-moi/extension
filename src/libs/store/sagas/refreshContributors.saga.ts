import { put } from 'redux-saga/effects';
import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';
import {
  receivedContributors,
  refreshContributorsFailed
} from 'libs/store/actions';
import fetchContributors from 'libs/api/fetchContributors';
import { Contributor, ContributorId } from '../../domain/contributor';
import { asArray } from '../../utils/env';

const ACCESSIBLE_CONTRIBUTORS_IDS = asArray<ContributorId>(
  process.env.ACCESSIBLE_CONTRIBUTORS_IDS
);

const filterAccessibleContributors = (
  contributors: Contributor[]
): Contributor[] =>
  ACCESSIBLE_CONTRIBUTORS_IDS.length > 0
    ? contributors.filter(c => ACCESSIBLE_CONTRIBUTORS_IDS.includes(c.id))
    : contributors;

export default function* refreshContributorsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 10,
    onError: function*(error: Error) {
      yield put(refreshContributorsFailed(error));
    }
  });
  const contributors = yield callAndRetry(fetchContributors);

  if (contributors) {
    const accessibleContributors = filterAccessibleContributors(contributors);

    yield put(receivedContributors(accessibleContributors));
  }
}

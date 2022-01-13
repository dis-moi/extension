import { put } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { refreshContributors } from 'libs/store/actions';
import { fetchContributorRequest } from 'libs/store/actions/contributor';
import takeLatestLocationChange from 'libs/store/sagas/effects/takeLatestLocationChange';
import en from 'libs/i18n/resources/en/extension.json';
import fr from 'libs/i18n/resources/fr/extension.json';
import { ContributorId } from 'libs/domain/contributor';
import { getFacet } from 'libs/facets/getFacet';
import { fetchContributorNotices } from '../actions/notices';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id) as ContributorId));
  yield put(fetchContributorNotices(Number(match.params.id) as ContributorId));
  yield put(refreshContributors());
}

const prefix = getFacet() === 'lmel' ? '' : '/:lang';

export default function* locationChangeSaga() {
  yield takeLatestLocationChange(
    [
      prefix + en.path.profiles.contributors,
      prefix + fr.path.profiles.contributors
    ],
    contributorsLocationSaga
  );

  yield takeLatestLocationChange(
    [
      prefix + en.path.profiles.subscriptions,
      prefix + fr.path.profiles.subscriptions
    ],
    contributorsLocationSaga
  );

  yield takeLatestLocationChange<{ id: string }>(
    [
      prefix + en.path.profiles.contributors + '/:id/:slug',
      prefix + fr.path.profiles.contributors + '/:id/:slug'
    ],
    contributorLocationSaga
  );
}

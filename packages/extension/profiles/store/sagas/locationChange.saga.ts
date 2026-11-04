import { put } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { refreshContributors } from 'libs/store/actions';
import { fetchContributorRequest } from 'libs/store/actions/contributor';
import takeLatestLocationChange from 'libs/store/sagas/effects/takeLatestLocationChange';
import en from '@dismoi/i18n/resources/en/extension.json';
import fr from '@dismoi/i18n/resources/fr/extension.json';
import { ContributorId } from '@dismoi/domain/contributor';
import { fetchContributorNotices } from '../actions/notices';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id) as ContributorId));
  yield put(fetchContributorNotices(Number(match.params.id) as ContributorId));
  yield put(refreshContributors());
}

// Les chemins traduits portent déjà la langue — « /fr/profils », « /en/guides »
// — et sont ceux que sert le site. Les préfixer d'un « /:lang » attendrait
// « /fr/fr/profils » : aucune navigation ne correspondrait, et les
// contributeurs ne seraient jamais chargés.
export const contributorsPaths = [
  en.path.profiles.contributors,
  fr.path.profiles.contributors,
];

export const subscriptionsPaths = [
  en.path.profiles.subscriptions,
  fr.path.profiles.subscriptions,
];

export const contributorPaths = contributorsPaths.map(
  (path) => `${path}/:id/:slug`,
);

export default function* locationChangeSaga() {
  yield takeLatestLocationChange(contributorsPaths, contributorsLocationSaga);

  yield takeLatestLocationChange(subscriptionsPaths, contributorsLocationSaga);

  yield takeLatestLocationChange<{ id: string }>(
    contributorPaths,
    contributorLocationSaga,
  );
}

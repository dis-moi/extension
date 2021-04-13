import { put } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { fetchContributorNotices } from '../actions/notices';
import { refreshContributors } from 'app/actions';
import { fetchContributorRequest } from 'app/actions/contributor';
import takeLatestLocationChange from 'app/store/sagas/effects/takeLatestLocationChange';
import en from 'i18n/resources/en/extension.json';
import fr from 'i18n/resources/fr/extension.json';
import { ContributorId } from '../../../lmem/contributor';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id) as ContributorId));
  yield put(fetchContributorNotices(Number(match.params.id) as ContributorId));
  yield put(refreshContributors());
}

export default function* locationChangeSaga() {
  yield takeLatestLocationChange(
    [en.path.profiles.contributors, fr.path.profiles.contributors],
    contributorsLocationSaga
  );

  yield takeLatestLocationChange(
    [en.path.profiles.subscriptions, fr.path.profiles.subscriptions],
    contributorsLocationSaga
  );

  yield takeLatestLocationChange<{ id: string }>(
    [
      en.path.profiles.contributors + '/:id/:slug',
      fr.path.profiles.contributors + '/:id/:slug'
    ],
    contributorLocationSaga
  );
}

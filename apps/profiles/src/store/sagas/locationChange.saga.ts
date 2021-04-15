import { put } from 'redux-saga/effects';
import { match as Match } from 'react-router';
import { refreshContributors } from 'src/app/actions';
import { fetchContributorNotices } from '../actions/notices';
import { fetchContributorRequest } from 'libs/store/actions/contributor';
import takeLatestLocationChange from 'libs/store/sagas/effects/takeLatestLocationChange';
import en from 'libs/i18n/resources/en/extension.json';
import fr from 'libs/i18n/resources/fr/extension.json';

function* contributorsLocationSaga() {
  yield put(refreshContributors());
}

function* contributorLocationSaga(match: Match<{ id: string }>) {
  yield put(fetchContributorRequest(Number(match.params.id)));
  yield put(fetchContributorNotices(Number(match.params.id)));
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

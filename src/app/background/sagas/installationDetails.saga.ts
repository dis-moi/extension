import { SagaIterator } from 'redux-saga';
import { put, select, takeLatest } from 'redux-saga/effects';
import {
  FETCH_INSTALLATION_DETAILS,
  FetchInstallationDetailsAction,
  fetchInstallationDetailsFailure,
  updateInstallationDetails
} from 'app/actions/install';
import { getInstallationDetails } from 'app/background/selectors/installationDetails';

export function* fetchInstallationDetailsSaga({
  meta
}: FetchInstallationDetailsAction): SagaIterator {
  try {
    const installationDetails = yield select(getInstallationDetails);

    yield put(
      updateInstallationDetails(installationDetails, { receiver: meta?.sender })
    );
  } catch (e) {
    yield put(
      fetchInstallationDetailsFailure(e, {
        receiver: meta?.sender
      })
    );
  }
}

export default function* installationDetailsSaga() {
  yield takeLatest(FETCH_INSTALLATION_DETAILS, fetchInstallationDetailsSaga);
}

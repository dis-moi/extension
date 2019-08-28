import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put } from 'redux-saga/effects';
import { captureException } from 'app/utils/sentry';
import {
  InstalledAction,
  updateInstallationDetails
} from 'app/actions/install';
import { isAnUpdateFromLmem } from 'app/background/selectors';
import { areTosAccepted } from 'app/background/selectors/prefs';
import { getInstallationDate } from 'app/background/selectors/installationDetails';
import { InstallationDetails } from 'app/lmem/installation';
import { version } from '../../../../package.json';

export function* installedSaga({
  payload: { installedDetails }
}: InstalledAction): SagaIterator {
  try {
    const datetime = yield select(getInstallationDate);

    // @todo why not use this function to get the current version ?
    // const version = chrome.runtime.getManifest().version;

    const installationDetails: InstallationDetails = {
      ...installedDetails,
      version,
      datetime: datetime || new Date(),
      updatedAt: new Date()
    };

    yield put(updateInstallationDetails(installationDetails, false));
  } catch (e) {
    captureException(e);
  }
}

export function* installationDetailsSaga(): SagaIterator {
  try {
    const updatedFromLmem = yield select(isAnUpdateFromLmem);
    const tosAccepted = yield select(areTosAccepted);
    console.log('tosAccepted', tosAccepted);
    console.log('updatedFromLmem', updatedFromLmem);
    if (updatedFromLmem && !tosAccepted) {
      // open onboarding page at step 1
    } else {
      // open onboarding page at step 2
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* installSaga() {
  yield takeLatest('INSTALLED', installedSaga);
  yield takeLatest('INSTALLATION_DETAILS', installationDetailsSaga);
}

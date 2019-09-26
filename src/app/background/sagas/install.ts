import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put, call, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import { captureException } from 'app/utils/sentry';
import openOptions from 'webext/openOptionsTab';
import {
  InstalledAction,
  updateInstallationDetails
} from 'app/actions/install';
import { isAnUpdateFromLmem, isRehydrated } from 'app/background/selectors';
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

    const rehydrated = yield select(isRehydrated);
    if (!rehydrated) {
      yield take(REHYDRATE);
    }

    yield put(updateInstallationDetails(installationDetails, false));
  } catch (e) {
    captureException(e);
  }
}

export function* installationDetailsSaga(): SagaIterator {
  try {
    const updatedFromLmem = yield select(isAnUpdateFromLmem);
    const tosAccepted = yield select(areTosAccepted);

    // @todo should be checked each time the application boot? and ALSO after the install event?
    if (updatedFromLmem) {
      yield call(chrome.browserAction.setTitle, {
        title: 'Le Même en Mieux devient Bulles'
      });
    }

    yield call(
      openOptions,
      !tosAccepted ? '/onboarding' : '/onboarding/subscribe'
    );
  } catch (error) {
    captureException(error);
  }
}

export default function* installSaga() {
  yield takeLatest('INSTALLED', installedSaga);
  yield takeLatest('INSTALLATION_DETAILS', installationDetailsSaga);
}

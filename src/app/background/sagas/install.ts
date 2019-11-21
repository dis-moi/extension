import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put, call, all } from 'redux-saga/effects';
import { captureException } from 'app/utils/sentry';
import openOptions from 'webext/openOptionsTab';
import {
  InstalledAction,
  updateInstallationDetails
} from 'app/actions/install';
import {
  isAnUpdateFromLmem,
  isOnboardingRequired
} from 'app/background/selectors';
import { areTosAccepted } from 'app/background/selectors/prefs';
import { getInstallationDate } from 'app/background/selectors/installationDetails';
import { InstallationDetails } from 'app/lmem/installation';
import { version } from '../../../../package.json';
import { subscribe } from 'app/actions';
import { lmemContributorIds } from 'app/lmemContributors';

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

    // @todo should be checked each time the application boot? and ALSO after the install event?
    if (updatedFromLmem) {
      yield call(chrome.browserAction.setTitle, {
        title: 'Le Même en Mieux devient Bulles'
      });
      yield all(lmemContributorIds.map(id => put(subscribe(id))));
    }

    const onboardingRequired = yield select(isOnboardingRequired);
    const tosAccepted = yield select(areTosAccepted);
    if (onboardingRequired) {
      yield call(
        openOptions,
        !tosAccepted ? '/onboarding' : '/onboarding/subscribe'
      );
    }
  } catch (error) {
    captureException(error);
  }
}

export default function* installSaga() {
  yield takeLatest('INSTALLED', installedSaga);
  yield takeLatest('INSTALLATION_DETAILS', installationDetailsSaga);
}

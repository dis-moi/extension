import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put, call, all } from 'redux-saga/effects';
import { captureException } from 'app/utils/sentry';
import openOptions from 'webext/openOptionsTab';
import {
  INSTALLATION_DETAILS,
  INSTALLED,
  updateInstallationDetails,
  InstalledAction
} from 'app/actions/install';
import { isAnUpdate, isOnboardingRequired } from 'app/background/selectors';
import { getInstallationDate } from 'app/background/selectors/installationDetails';
import { InstallationDetails } from 'app/lmem/installation';
import { version } from '../../../../package.json';
import { subscribe } from 'app/actions';
import { preselectedContributorIds } from 'app/lmemContributors';
import { loginSaga } from './user.saga';
import awaitRehydrationSaga from './lib/awaitRehydration.saga';

export function* installedSaga({
  payload: { installedDetails }
}: InstalledAction): SagaIterator {
  try {
    const datetime = yield select(getInstallationDate);

    yield call(loginSaga);

    // @todo why not use this function to get the current version ?
    // const version = chrome.runtime.getManifest().version;

    const installationDetails: InstallationDetails = {
      ...installedDetails,
      version,
      datetime: datetime || new Date(),
      updatedAt: new Date()
    };

    yield call(awaitRehydrationSaga);

    yield put(updateInstallationDetails(installationDetails, false));
  } catch (e) {
    captureException(e);
  }
}

export function* installationDetailsSaga(): SagaIterator {
  try {
    const onboardingRequired = yield select(isOnboardingRequired);
    if (onboardingRequired) {
      yield all(
        preselectedContributorIds.map(contributorId =>
          put(subscribe(contributorId))
        )
      );

      const updated = yield select(isAnUpdate);
      if (!updated) {
        yield call(openOptions, '/onboarding');
      }
    }
  } catch (error) {
    captureException(error);
  }
}

export default function* installSaga() {
  yield takeLatest(INSTALLED, installedSaga);
  yield takeLatest(INSTALLATION_DETAILS, installationDetailsSaga);
}

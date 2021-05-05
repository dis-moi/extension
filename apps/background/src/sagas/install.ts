import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import { captureException } from 'libs/utils/sentry';
import { optionsRequested } from 'src/app/actions';
import {
  INSTALLED,
  updateInstallationDetails,
  InstalledAction
} from 'libs/store/actions/install';
import { getInstallationDate } from 'apps/background/src/selectors/installationDetails';
import { InstallationDetails } from 'libs/lmem/installation';
import { version } from '../../../../package.json';
import { loginSaga } from './user.saga';
import { buildQueryString } from 'apps/background/src/api/call';

const { UNINSTALL_ORIGIN } = process.env;

export function* installedSaga({
  payload: { installedDetails }
}: InstalledAction): SagaIterator {
  try {
    const extensionId = yield call(loginSaga);
    if (typeof UNINSTALL_ORIGIN === 'string') {
      browser.runtime
        .setUninstallURL(
          `${UNINSTALL_ORIGIN}${buildQueryString({ extensionId })}`
        )
        .catch(e => e);
    }

    const datetime = yield select(getInstallationDate);

    // @todo why not use this function to get the current version ?
    // const version = chrome.runtime.getManifest().version;

    const installationDetails: InstallationDetails = {
      ...installedDetails,
      version,
      datetime: datetime || new Date(),
      updatedAt: new Date()
    };

    yield put(
      updateInstallationDetails(installationDetails, { sendToTab: false })
    );

    const { reason } = installedDetails;
    if (reason === 'install') {
      // eslint-disable-next-line @typescript-eslint/camelcase
      yield put(optionsRequested({ params: { pk_campaign: 'installed' } }));
    }
  } catch (e) {
    captureException(e);
  }
}

export default function* installSaga() {
  yield takeLatest(INSTALLED, installedSaga);
}

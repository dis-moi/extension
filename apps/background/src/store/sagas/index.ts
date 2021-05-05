import { fork, all, call } from 'redux-saga/effects';
import install from './install';
import tab from './tab';
import badge from './badge';
import theme from 'libs/theme';
import listenActionsFromMessages from 'libs/store/sagas/listenActionsFromMessages';
import refreshMatchingContexts from './refreshMatchingContexts';
import refreshContributors from './refreshContributors';
import watchActivatedTab from './watchActivatedTab.saga';
import watchBrowserAction from './watchBrowserAction.saga';
import handleBrowserAction from './handleBrowserAction.saga';
import options from './options.saga';
import ratings from './ratings';
import sendContributorsToOptions from './transmitContributors.saga';
import setup from './setup.saga';
import tos from './tos.saga';
import awaitRehydrationSaga from './lib/awaitRehydration.saga';
import subscriptionsSaga from './subscriptions.saga';
import tracking from './tracking';
import MatomoTracker from 'libs/matomo';
import { fetchRestrictedContextsSaga } from './fetchRestrictedContexts.saga';
import connectSaga from './connect.saga';
import installationDetailsSaga from './installationDetails.saga';
import { loginSaga } from './user.saga';
import { doNotTrackSettingFromNavigatorIsActivated } from '../../../../../libs/webext/checkDoNotTrack';
import contributionSaga from './contribution';

const tracker =
  process.env.TRACKING_SITE_ID &&
  process.env.TRACKING_URL &&
  doNotTrackSettingFromNavigatorIsActivated() === false
    ? new MatomoTracker(process.env.TRACKING_SITE_ID, process.env.TRACKING_URL)
    : undefined;

export default function* rootSaga() {
  yield call(awaitRehydrationSaga);
  yield all([
    fork(loginSaga),
    fork(install),
    fork(fetchRestrictedContextsSaga),
    fork(refreshMatchingContexts),
    fork(refreshContributors),
    fork(tab),
    fork(badge(theme.badge)),
    fork(listenActionsFromMessages('background')),
    fork(watchBrowserAction),
    fork(watchActivatedTab),
    fork(handleBrowserAction),
    fork(options),
    fork(ratings),
    fork(sendContributorsToOptions),
    fork(setup),
    fork(tos),
    fork(tracking(tracker)),
    fork(subscriptionsSaga),
    fork(installationDetailsSaga),
    fork(connectSaga),
    fork(contributionSaga)
  ]);
}

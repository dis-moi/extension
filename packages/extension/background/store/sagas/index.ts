import { all, call, fork } from 'redux-saga/effects';
import { asBoolean } from 'libs/utils/env';
import PlausibleTracker from 'libs/tracking/plausible';
import listenActionsFromMessages from 'libs/store/sagas/listenActionsFromMessages';
import doNotTrack from 'libs/webext/doNotTrack';
import { getTheme } from 'libs/facets/getTheme';
import install from './install';
import tab from './tab';
import badge from './badge';
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
import { fetchRestrictedContextsSaga } from './fetchRestrictedContexts.saga';
import connectSaga from './connect.saga';
import installationDetailsSaga from './installationDetails.saga';
import { loginSaga } from './user.saga';
import contributionSaga from './contribution';

const tracker =
  process.env.PLAUSIBLE_DOMAIN && !doNotTrack()
    ? new PlausibleTracker(
        process.env.PLAUSIBLE_DOMAIN,
        process.env.PLAUSIBLE_API_URL,
      )
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
    fork(badge(getTheme().badge)),
    fork(listenActionsFromMessages('background')),
    fork(watchBrowserAction),
    fork(watchActivatedTab),
    fork(handleBrowserAction),
    fork(options),
    fork(sendContributorsToOptions),
    fork(setup),
    fork(tos),
    fork(tracking(tracker)),
    fork(subscriptionsSaga),
    fork(installationDetailsSaga),
    fork(connectSaga),
    fork(contributionSaga),
  ]);

  if (asBoolean(process.env.TRACKING_BACKEND)) {
    yield fork(ratings);
  }
}

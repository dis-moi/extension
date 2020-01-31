import { fork, all, call } from 'redux-saga/effects';
import install from './install';
import tab from './tab';
import badge from './badge';
import externalMessage from './externalMessage';
import theme from '../../theme';
import error from '../../sagas/error';
import listenActionsFromMessages from '../../sagas/listenActionsFromMessages';
import refreshMatchingContexts from './refreshMatchingContexts';
import refreshContributors from './refreshContributors';
import watchActivatedTab from './watchActivatedTab.saga';
import watchBrowserAction from './watchBrowserAction.saga';
import handleBrowserAction from './handleBrowserAction.saga';
import openOptions from './openOptions.saga';
import ratings from './ratings';
import sendContributorsToOptions from './transmitContributors.saga';
import sendInstallationDetailsToOptions from './sendInstallationDetailsToOptions.saga';
import setup from './setup.saga';
import tos from './tos.saga';
import awaitRehydratationSaga from './lib/awaitRehydratation.saga';
import subscriptionsSaga from './subscriptions';
import tracking from './tracking';
import MatomoTracker from 'app/matomo';

const tracker =
  process.env.TRACKING_SITE_ID && process.env.TRACKING_URL
    ? new MatomoTracker(process.env.TRACKING_SITE_ID, process.env.TRACKING_URL)
    : undefined;

export default function* rootSaga() {
  yield call(awaitRehydratationSaga);

  yield all([
    fork(install),
    fork(refreshMatchingContexts),
    fork(refreshContributors),
    fork(tab),
    fork(badge(theme.badge)),
    fork(listenActionsFromMessages('background')),
    fork(externalMessage),
    fork(watchBrowserAction),
    fork(watchActivatedTab),
    fork(handleBrowserAction),
    fork(openOptions),
    fork(ratings),
    fork(sendContributorsToOptions),
    fork(sendInstallationDetailsToOptions),
    fork(setup),
    fork(error),
    fork(tos),
    fork(tracking(tracker)),
    fork(subscriptionsSaga)
  ]);
}

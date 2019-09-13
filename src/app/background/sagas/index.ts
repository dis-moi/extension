import { fork, all } from 'redux-saga/effects';
import install from './install';
import tab from './tab';
import badge from './badge';
import externalMessage from './externalMessage';
import theme from '../../theme';
import error from '../../sagas/error';
import listenActionsFromMessages from '../../sagas/listenActionsFromMessages';
import refreshMatchingContexts from './refreshMatchingContexts';
import refreshContributors from './refreshContributors';
import watchBrowserAction from './watchBrowserAction.saga';
import handleBrowserAction from './handleBrowserAction.saga';
import openOptions from './openOptions.saga';
import sendContributorsToOptions from './sendContributorsToOptions.saga';
import sendInstallationDetailsToOptions from './sendInstallationDetailsToOptions.saga';
import setup from './setup.saga';
import tos from './tos.saga';

export default function* rootSaga() {
  yield all([
    fork(install),
    fork(refreshMatchingContexts),
    fork(refreshContributors),
    fork(tab),
    fork(badge(theme.badge)),
    fork(listenActionsFromMessages('background')),
    fork(externalMessage),
    fork(watchBrowserAction),
    fork(handleBrowserAction),
    fork(openOptions),
    fork(sendContributorsToOptions),
    fork(sendInstallationDetailsToOptions),
    fork(setup),
    fork(error),
    fork(tos)
  ]);
}

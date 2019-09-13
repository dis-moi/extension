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
import browserAction from './browserAction.saga';
import openOptions from './openOptions.saga';
import sendContributorsToOptions from './sendContributorsToOptions.saga';
import setup from './setup.saga';

export default function* rootSaga() {
  yield all([
    fork(install),
    fork(refreshMatchingContexts),
    fork(refreshContributors),
    fork(tab),
    fork(badge(theme.badge)),
    fork(listenActionsFromMessages('background')),
    fork(externalMessage),
    fork(browserAction),
    fork(openOptions),
    fork(sendContributorsToOptions),
    fork(setup),
    fork(error)
  ]);
}

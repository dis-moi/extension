import { fork, all } from 'redux-saga/effects';
import tab from './tab';
import badge from './badge';
import externalMessage from './externalMessage';
import theme from '../../theme';
import error from '../../sagas/error';
import listenActionsFromMessages from '../../sagas/listenActionsFromMessages';
import refreshMatchingContexts from './refreshMatchingContexts';
import refreshContributors from './refreshContributors';
import watchBrowserActionSaga from './browserAction.saga';
import openOptionsWhenRequestedSaga from './openOptions.saga';
import sendContributorsToOptionsSaga from './sendContributorsToOptions.saga';

export default function* rootSaga() {
  yield all([
    fork(refreshMatchingContexts),
    fork(refreshContributors),
    fork(tab),
    fork(badge(theme.badge)),
    fork(listenActionsFromMessages('background')),
    fork(externalMessage),
    fork(watchBrowserActionSaga),
    fork(openOptionsWhenRequestedSaga),
    fork(sendContributorsToOptionsSaga),
    fork(error)
  ]);
}

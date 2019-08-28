import { fork, all } from 'redux-saga/effects';
import tab from './tab';
import badge from './badge';
import externalMessage from './externalMessage';
import theme from '../../theme';
import error from '../../sagas/error';
import settings from './settings';
import refreshMatchingContexts from './refreshMatchingContexts';
import refreshContributors from './refreshContributors';

export default function* rootSaga() {
  yield all([
    fork(refreshMatchingContexts),
    fork(refreshContributors),
    fork(tab),
    fork(badge(theme.badge)),
    fork(externalMessage),
    fork(settings),
    fork(error)
  ]);
}

import { fork, all } from 'redux-saga/effects';
import matchingContexts from './matchingContexts';
import tab from './tab';
import badge from './badge';
import externalMessage from './externalMessage';
import theme from '../../theme';
import error from '../../sagas/error';

export default function* rootSaga() {
  yield all([
    fork(matchingContexts),
    fork(tab),
    fork(badge(theme.badge)),
    fork(externalMessage),
    fork(error)
  ]);
}

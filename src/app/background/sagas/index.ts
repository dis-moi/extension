import { fork, all } from 'redux-saga/effects';
import matchingContexts from './matchingContexts';
import tab from './tab';
import badge from './badge';
import theme from '../../theme';

export default function* rootSaga() {
  yield all([fork(matchingContexts), fork(tab), fork(badge(theme.badge))]);
}

import { put } from 'redux-saga/effects';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import { showNews } from '../../../../libs/store/actions/news.actions';
import Tab from '../../../../libs/domain/tab';

export function* showNewsSaga(tab: Tab) {
  try {
    yield put(
      showNews(
        {
          message: 'oucou'
        },
        tab
      )
    );
  } catch (e) {
    yield put(createErrorAction()(e, { severity: Level.ERROR }));
  }
}

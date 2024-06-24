import { put } from 'redux-saga/effects';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import { showNews } from '../../../../libs/store/actions/news.actions';
import Tab from '../../../../libs/domain/tab';

function* getNews() {
  return 'Ceci est une news à afficher dans l\'encart news';
}

export function* showNewsSaga(tab: Tab) {
  try {
    const message = yield getNews();
    yield put(
      showNews(
        {
          message
        },
        tab
      )
    );
  } catch (e) {
    yield put(createErrorAction()(e, { severity: Level.ERROR }));
  }
}

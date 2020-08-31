import { call, put } from 'redux-saga/effects';
import {
  fetchNoticesFailure,
  FetchNoticesRequestAction,
  NoticesByContributorParameters,
  noticesFetched
} from 'app/actions';
import { fetchNotice, fetchNotices } from 'api/fetchNotice';
import { Notice } from '../../lmem/notice';
import { CONTRIBUTOR_NOTICES_BY_PAGE } from '../../profiles/store/sagas/notices.saga';

interface PayloadWithUrl {
  url: string;
}

export default function* fetchNoticesSaga({
  payload
}: FetchNoticesRequestAction) {
  try {
    if ('url' in payload && (payload as PayloadWithUrl).url) {
      const notices = [
        yield call(fetchNotice, (payload as PayloadWithUrl).url)
      ];

      yield put(noticesFetched(notices));
    } else {
      const { offset, contributor } = payload as NoticesByContributorParameters;

      const notices: Notice[] = yield call(fetchNotices, payload);

      const fetchedAll = notices.length < CONTRIBUTOR_NOTICES_BY_PAGE;

      yield put(noticesFetched(notices, offset, contributor || 0, fetchedAll));
    }
  } catch (e) {
    yield put(fetchNoticesFailure(e, {}));
  }
}

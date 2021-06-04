import { call, put } from 'redux-saga/effects';
import {
  fetchNoticesFailure,
  FetchNoticesRequestAction,
  NoticesByContributorParameters,
  noticesFetched
} from 'libs/store/actions';
import { fetchNotice, fetchNotices } from 'libs/api/fetchNotice';
import { Notice } from 'libs/domain/notice';
import { ContributorId } from 'libs/domain/contributor';
import { CONTRIBUTOR_NOTICES_BY_PAGE } from 'app/profiles/store/sagas/notices.saga';

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

      yield put(
        noticesFetched(
          notices,
          offset,
          contributor || (0 as ContributorId),
          fetchedAll
        )
      );
    }
  } catch (e) {
    yield put(fetchNoticesFailure(e, {}));
  }
}

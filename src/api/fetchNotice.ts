import { Notice } from 'app/lmem/notice';
import { CONTRIBUTOR_NOTICES_BY_PAGE } from 'app/profiles/store/sagas/notices.saga';
import { get } from './call';

export const fetchNotice = (noticeUrl: string): Promise<Notice> =>
  get(noticeUrl);

export const fetchNoticesByUrls = (noticeUrls: string[]): Promise<Notice[]> =>
  Promise.all(noticeUrls.map(fetchNotice));

export const fetchNotices = (data: object = {}): Promise<Notice[]> =>
  get('notices', { limit: CONTRIBUTOR_NOTICES_BY_PAGE, offset: 0, ...data });

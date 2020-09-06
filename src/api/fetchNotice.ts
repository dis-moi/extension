import {
  NoticeWithContributor,
  NoticeWithContributorId
} from 'app/lmem/notice';
import { CONTRIBUTOR_NOTICES_BY_PAGE } from 'app/profiles/store/sagas/notices.saga';
import { get } from './call';

export const fetchNotice = (
  noticeUrl: string
): Promise<NoticeWithContributor> => get(noticeUrl);

export const fetchNoticesByUrls = (
  noticeUrls: string[]
): Promise<NoticeWithContributor[]> => Promise.all(noticeUrls.map(fetchNotice));

export const fetchNotices = (
  data: object = {}
): Promise<NoticeWithContributorId[]> =>
  get('notices', { limit: CONTRIBUTOR_NOTICES_BY_PAGE, offset: 0, ...data });

import { Notice } from '../app/lmem/notice';
import { get } from './call';

export const fetchNotice = (noticeUrl: string): Promise<Notice> =>
  get(noticeUrl);

export const fetchNoticesByUrls = (noticeUrls: string[]): Promise<Notice[]> =>
  Promise.all(noticeUrls.map(fetchNotice));

export const fetchNotices = (data: object = {}): Promise<Notice[]> =>
  get('notices', data);

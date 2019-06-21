import { Notice } from 'app/lmem/notice';
import { get } from './call';

export const fetchNotice = (noticeUrl: string): Promise<Notice> =>
  get(noticeUrl);

export const fetchNotices = (noticeUrls: string[]): Promise<Notice[]> =>
  Promise.all(noticeUrls.map(fetchNotice));

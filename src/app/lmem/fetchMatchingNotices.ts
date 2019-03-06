import { Notice } from './notice';

const fetchNotice = (url: string): Promise<Notice> =>
  fetch(url).then((response: Response) => response.json());

export const fetchMatchingNotices = (urls: string[]) =>
  Promise.all(urls.map(fetchNotice));

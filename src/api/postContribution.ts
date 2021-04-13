import { Contribution, NoticeWithContributor } from 'app/lmem/notice';
import { post } from './call';

const postContribution = (
  contribution: Contribution
): Promise<NoticeWithContributor> => post(`contributions`, contribution);

export default postContribution;

import { post } from './call';
import { Contribution, NoticeWithContributor } from 'app/lmem/notice';

const postContribution = (
  contribution: Contribution
): Promise<NoticeWithContributor> => post(`contributions`, contribution);

export default postContribution;

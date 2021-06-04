import { Contribution, NoticeWithContributor } from 'libs/domain/notice';
import { post } from './call';

const postContribution = (
  contribution: Contribution
): Promise<NoticeWithContributor> => post(`contributions`, contribution);

export default postContribution;

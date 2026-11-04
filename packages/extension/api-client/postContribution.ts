import { Contribution, NoticeWithContributor } from '@dismoi/domain/notice';
import { post } from './call';

const postContribution = (
  contribution: Contribution,
): Promise<NoticeWithContributor> => post(`contributions`, contribution);

export default postContribution;

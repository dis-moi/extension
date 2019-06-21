import { Contribution } from 'app/lmem/notice';
import { BaseAction } from '.';

export interface ContributionSubmittedAction extends BaseAction {
  type: 'CONTRIBUTION_SUBMITTED';
  payload: Contribution;
}

export const contributionSubmitted = (
  contribution: Contribution
): ContributionSubmittedAction => ({
  type: 'CONTRIBUTION_SUBMITTED',
  payload: contribution
});

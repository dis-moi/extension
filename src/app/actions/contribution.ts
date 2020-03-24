import { Contribution } from 'app/lmem/notice';
import { BaseAction, FormAction, FormMeta, ErrorAction } from '.';
import { Level } from '../utils/Logger';

export const SUBMIT_CONTRIBUTION = 'CONTRIBUTION/SUBMIT';
export interface SubmitContributionAction extends FormAction {
  type: typeof SUBMIT_CONTRIBUTION;
  payload: Contribution;
}
export const submitContribution = (
  notice: Contribution,
  meta: FormMeta
): SubmitContributionAction => ({
  type: SUBMIT_CONTRIBUTION,
  payload: notice,
  meta
});

export const CONTRIBUTION_SUBMITTED = 'CONTRIBUTION/SUBMITTED';
export interface ContributionSubmittedAction extends BaseAction {
  type: typeof CONTRIBUTION_SUBMITTED;
  payload: Contribution;
}
export const contributionSubmitted = (
  contribution: Contribution
): ContributionSubmittedAction => ({
  type: CONTRIBUTION_SUBMITTED,
  payload: contribution
});

export const CONTRIBUTION_SUBMISSION_FAILED = 'CONTRIBUTION/SUBMISSION_FAILED';
export interface ContributionSubmissionFailed extends ErrorAction {
  type: typeof CONTRIBUTION_SUBMISSION_FAILED;
}
export const contributionSubmissionFailed = (
  e: Error
): ContributionSubmissionFailed => ({
  type: CONTRIBUTION_SUBMISSION_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.ERROR }
});

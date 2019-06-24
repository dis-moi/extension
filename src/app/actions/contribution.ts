import { Contribution } from 'app/lmem/notice';
import { BaseAction, FormAction, FormMeta, ErrorAction } from '.';

export interface SubmitContributionAction extends FormAction {
  type: 'CONTRIBUTION/SUBMIT';
  payload: Contribution;
}
export const submitContribution = (
  notice: Contribution,
  meta: FormMeta
): SubmitContributionAction => ({
  type: 'CONTRIBUTION/SUBMIT',
  payload: notice,
  meta
});

export interface ContributionSubmittedAction extends BaseAction {
  type: 'CONTRIBUTION/SUBMITTED';
  payload: Contribution;
}
export const contributionSubmitted = (
  contribution: Contribution
): ContributionSubmittedAction => ({
  type: 'CONTRIBUTION/SUBMITTED',
  payload: contribution
});

export interface ContributionSubmissionFailed extends ErrorAction {
  type: 'CONTRIBUTION/SUBMISSION_FAILED';
}
export const contributionSubmissionFailed = (
  e: Error
): ContributionSubmissionFailed => ({
  type: 'CONTRIBUTION/SUBMISSION_FAILED',
  payload: e,
  error: true
});

export interface ContributionSubmissionCanceled extends BaseAction {
  type: 'CONTRIBUTION/SUBMISSION_CANCELED';
}
export const contributionSubmissionCanceled = (): ContributionSubmissionCanceled => ({
  type: 'CONTRIBUTION/SUBMISSION_CANCELED'
});

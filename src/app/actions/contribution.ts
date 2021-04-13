import { Contribution } from 'app/lmem/notice';
import { Level } from '../utils/Logger';
import { BaseAction, FormAction, FormMeta, ActionMeta, ErrorAction } from '.';

export const SUBMIT_CONTRIBUTION = 'CONTRIBUTION/SUBMIT';
export interface SubmitContributionAction extends FormAction {
  type: typeof SUBMIT_CONTRIBUTION;
  payload: Contribution;
}
export const submitContribution = (
  contribution: Contribution,
  meta: FormMeta
): SubmitContributionAction => ({
  type: SUBMIT_CONTRIBUTION,
  payload: contribution,
  meta: { ...meta, sendToBackground: true }
});

export const CONTRIBUTION_SUBMITTED = 'CONTRIBUTION/SUBMITTED';
export interface ContributionSubmittedAction extends BaseAction {
  type: typeof CONTRIBUTION_SUBMITTED;
  payload: Contribution;
}
export const contributionSubmitted = (
  contribution: Contribution,
  meta: ActionMeta = {}
): ContributionSubmittedAction => ({
  type: CONTRIBUTION_SUBMITTED,
  payload: contribution,
  meta: { ...meta, sendToTab: true }
});

export const CONTRIBUTION_SUBMISSION_FAILED = 'CONTRIBUTION/SUBMISSION_FAILED';
export interface ContributionSubmissionFailedAction extends ErrorAction {
  type: typeof CONTRIBUTION_SUBMISSION_FAILED;
}
export const contributionSubmissionFailed = (
  e: Error,
  meta: ActionMeta = {}
): ContributionSubmissionFailedAction => ({
  type: CONTRIBUTION_SUBMISSION_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.ERROR, ...meta, sendToTab: true }
});

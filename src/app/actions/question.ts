import { Contribution } from 'app/lmem/notice';
import { BaseAction, FormAction, FormMeta, ErrorAction } from '.';
import { Level } from '../utils/Logger';

export const SUBMIT_QUESTION = 'QUESTION/SUBMIT';
export interface SubmitQuestionAction extends FormAction {
  type: typeof SUBMIT_QUESTION;
  payload: Contribution;
}
export const submitQuestion = (
  notice: Contribution,
  meta: FormMeta
): SubmitQuestionAction => ({
  type: SUBMIT_QUESTION,
  payload: notice,
  meta
});

export const QUESTION_SUBMITTED = 'QUESTION/SUBMITTED';
export interface QuestionSubmittedAction extends BaseAction {
  type: typeof QUESTION_SUBMITTED;
  payload: Contribution;
}
export const questionSubmitted = (
  question: Contribution
): QuestionSubmittedAction => ({
  type: QUESTION_SUBMITTED,
  payload: question
});

export const QUESTION_SUBMISSION_FAILED = 'QUESTION/SUBMISSION_FAILED';
export interface QuestionSubmissionFailed extends ErrorAction {
  type: typeof QUESTION_SUBMISSION_FAILED;
}
export const questionSubmissionFailed = (
  e: Error
): QuestionSubmissionFailed => ({
  type: QUESTION_SUBMISSION_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.ERROR }
});

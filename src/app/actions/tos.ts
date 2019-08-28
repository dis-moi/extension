import { ActionMeta, BaseAction, createErrorAction, ErrorAction } from '.';

export interface AcceptTosAction extends BaseAction {
  type: 'ACCEPT_TOS';
}
export const acceptTOS = (): AcceptTosAction => ({ type: 'ACCEPT_TOS' });
export interface TosAcceptedAction extends BaseAction {
  type: 'TOS_ACCEPTED';
}
export const tosAccepted = (): TosAcceptedAction => ({ type: 'TOS_ACCEPTED' });
export interface TosAcceptanceFailureAction extends ErrorAction {
  type: 'TOS_ACCEPTANCE_FAILURE';
}
export const tosAcceptanceFailure = (
  e: Error,
  meta: ActionMeta
): TosAcceptanceFailureAction =>
  createErrorAction('TOS_ACCEPTANCE_FAILURE')(e, meta);

export interface FetchTosAcceptedAction extends BaseAction {
  type: 'FETCH_TOS_ACCEPTED_REQUEST';
}
export const fetchTosAccepted = (): FetchTosAcceptedAction => ({
  type: 'FETCH_TOS_ACCEPTED_REQUEST'
});
export interface FetchTosAcceptedSuccess extends BaseAction {
  type: 'FETCH_TOS_ACCEPTED_SUCCESS';
  payload: boolean;
}
export const fetchTosAcceptedSuccess = (
  tosAccepted: boolean
): FetchTosAcceptedSuccess => ({
  type: 'FETCH_TOS_ACCEPTED_SUCCESS',
  payload: tosAccepted
});
export interface FetchTosAcceptedFailure extends ErrorAction {
  type: 'FETCH_TOS_ACCEPTED_FAILURE';
}
export const fetchTosAcceptedFailure = (
  e: Error,
  meta: ActionMeta
): FetchTosAcceptedFailure =>
  createErrorAction('FETCH_TOS_ACCEPTED_FAILURE')(e, meta);

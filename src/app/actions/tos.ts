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

export const TRANSMIT_TOS_STATE = 'TRANSMIT_TOS_STATE';
export interface TransmitTOSStateAction {
  type: typeof TRANSMIT_TOS_STATE;
  payload: boolean;
}

export const transmitTosState = (
  tosAccepted: boolean
): TransmitTOSStateAction => ({
  type: TRANSMIT_TOS_STATE,
  payload: tosAccepted
});

import { ActionMeta, BaseAction } from './index';

export const ACCEPT_TOS = 'ACCEPT_TOS';
export interface AcceptTosAction extends BaseAction {
  type: typeof ACCEPT_TOS;
}
export const acceptTOS = (meta: ActionMeta): AcceptTosAction => ({
  type: ACCEPT_TOS,
  meta
});

export const TOS_ACCEPTED = 'TOS_ACCEPTED';
export interface TosAcceptedAction extends BaseAction {
  type: typeof TOS_ACCEPTED;
}
export const tosAccepted = (meta: ActionMeta): TosAcceptedAction => ({
  type: TOS_ACCEPTED,
  meta
});

export const TRANSMIT_TOS_STATUS = 'TRANSMIT_TOS_STATUS';
export interface TransmitTOSStatusAction extends BaseAction {
  type: typeof TRANSMIT_TOS_STATUS;
  payload: boolean;
}

export const transmitTosStatus = (
  tosAccepted: boolean
): TransmitTOSStatusAction => ({
  type: TRANSMIT_TOS_STATUS,
  payload: tosAccepted
});

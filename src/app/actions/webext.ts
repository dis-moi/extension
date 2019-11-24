import { ActionMeta, AppAction, BaseAction, ErrorAction } from './index';
import { From } from 'webext/From';

export const LISTENING_ACTIONS_READY = 'LISTENING_ACTIONS_READY';
export interface ListeningActionsReadyAction extends BaseAction {
  type: typeof LISTENING_ACTIONS_READY;
  meta: ActionMeta & {
    from: From;
  };
}

export const listeningActionsReady = (
  from: From,
  meta: ActionMeta
): ListeningActionsReadyAction => ({
  type: LISTENING_ACTIONS_READY,
  meta: { ...meta, from }
});

export const isTabReadyAction = (action: AppAction): boolean =>
  action.type === LISTENING_ACTIONS_READY && !!action.meta.tab;

export const LISTEN_ACTION_FAILED = 'LISTEN_ACTION_FAILED';
export interface ListenActionFailedAction extends ErrorAction {
  type: typeof LISTEN_ACTION_FAILED;
}
export const listenActionFailed = (e: Error): ListenActionFailedAction => ({
  type: LISTEN_ACTION_FAILED,
  payload: e,
  error: true
});

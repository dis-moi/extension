import { AppAction, ErrorAction, TabAction, TabMeta } from './index';
import { From } from 'webext/From';

export interface ListeningActionsReadyAction extends TabAction {
  type: 'LISTENING_ACTIONS_READY';
  meta: TabMeta & {
    from: From;
  };
}

export const listeningActionsReady = (
  from: From,
  meta: TabMeta
): ListeningActionsReadyAction => ({
  type: 'LISTENING_ACTIONS_READY',
  meta: { ...meta, from }
});

export const isTabReadyAction = (action: AppAction): boolean =>
  action.type === 'LISTENING_ACTIONS_READY' && !!action.meta.tab;

export interface ListenActionFailedAction extends ErrorAction {
  type: 'LISTEN_ACTION_FAILED';
}
export const listenActionFailed = (e: Error): ListenActionFailedAction => ({
  type: 'LISTEN_ACTION_FAILED',
  payload: e,
  error: true
});

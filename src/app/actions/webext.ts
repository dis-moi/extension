import { StandardAction } from 'app/store/types';
import { ActionMeta, AppAction, BaseAction, ErrorAction } from './index';
import { From } from 'webext/From';
import { Level } from '../utils/Logger';

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
  error: true,
  meta: { severity: Level.WARN }
});

export interface LifecycleAction extends StandardAction {
  meta: {
    at: Date;
  };
}

export const STARTUP = 'STARTUP';
export interface StartupAction extends LifecycleAction {
  type: typeof STARTUP;
  meta: {
    at: Date;
  };
}

export const startup = (): StartupAction => ({
  type: STARTUP,
  meta: { at: new Date() }
});

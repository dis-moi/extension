import { BaseAction } from 'app/actions';

export const LOADED = 'LOADED';

export interface LoadedAction extends BaseAction {
  type: typeof LOADED;
}

export const loaded = (): LoadedAction => ({ type: LOADED });

import { BaseAction } from 'app/actions';

export const END_LOADING = 'END_LOADING';

export interface EndLoadingAction extends BaseAction {
  type: typeof END_LOADING;
}

export const endLoading = (): EndLoadingAction => ({ type: END_LOADING });

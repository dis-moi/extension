import { BaseAction } from '../../../../../libs/store/actions';

export const SET_TITLE = 'UI/SET_TITLE';

export interface SetUITitleAction extends BaseAction {
  type: typeof SET_TITLE;
  payload?: string;
}

export const setUITitle = (title: string): SetUITitleAction => ({
  type: SET_TITLE,
  payload: title
});

export const REMOVE_TITLE = 'UI/REMOVE_TITLE';

export interface RemoveUITitleAction extends BaseAction {
  type: typeof REMOVE_TITLE;
}

export const removeUITitle = (): RemoveUITitleAction => ({
  type: REMOVE_TITLE
});

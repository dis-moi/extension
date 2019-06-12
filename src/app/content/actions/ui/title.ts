import { BaseAction } from '../../../actions';

export interface SetUITitleAction extends BaseAction {
  type: 'UI/SET_TITLE';
  payload?: string;
}

export const setUITitle = (title: string): SetUITitleAction => ({
  type: 'UI/SET_TITLE',
  payload: title
});

export interface RemoveUITitleAction extends BaseAction {
  type: 'UI/REMOVE_TITLE';
}

export const removeUITitle = (): RemoveUITitleAction => ({
  type: 'UI/REMOVE_TITLE'
});

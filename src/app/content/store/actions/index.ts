import {
  RemoveUITitleAction,
  SetUITitleAction
} from 'app/content/store/actions/ui/title';
import { LoadedAction } from 'app/content/store/actions/ui/open.actions';
import { AppAction } from 'libs/store/actions';

export type ContentAction =
  | RemoveUITitleAction
  | SetUITitleAction
  | LoadedAction
  | AppAction;

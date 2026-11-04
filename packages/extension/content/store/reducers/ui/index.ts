import { combineReducers } from 'redux';
import notification from './notification.reducer';
import type { NotificationState } from './notification.reducer';
import title from './title';
import type { TitleState } from './title';

export type { NotificationState, TitleState };

export interface UIState {
  notification: NotificationState;
  title: TitleState;
}

export default combineReducers({
  notification,
  title,
});

import { combineReducers } from 'redux';
import notification, { NotificationState } from './notification.reducer';
import title, { TitleState } from './title';

export type { NotificationState, TitleState };

export interface UIState {
  notification: NotificationState;
  title: TitleState;
}

export default combineReducers({
  notification,
  title
});

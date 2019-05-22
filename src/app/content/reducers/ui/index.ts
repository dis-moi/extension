import { combineReducers } from 'redux';
import mounted, { MountedState } from './mounted';
import open, { OpenState } from './open';
import title, { TitleState } from './title';

export { MountedState, OpenState, TitleState };

export interface UIState {
  mounted: MountedState;
  open: OpenState;
  title: TitleState;
}

export default combineReducers({
  mounted,
  open,
  title
});

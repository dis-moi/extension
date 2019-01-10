import {
  TAB_CREATED,
  TAB_UPDATED,
  TAB_REMOVED,
  TAB_CONNECTED,
} from '../../../constants/browser/tabs';
import createAction from '../../../utils/createAction';

export const tabCreated = createAction(TAB_CREATED);
export const tabUpdated = createAction(TAB_UPDATED);
export const tabRemoved = createAction(TAB_REMOVED);
export const tabConnected = createAction(TAB_CONNECTED);

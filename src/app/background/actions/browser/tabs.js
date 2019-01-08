import {
  TAB_CREATED,
  TAB_UPDATED,
  TAB_REMOVED,
} from '../../../constants/browser/tabs';
import createAction from '../../../../lib/createAction';

export const tabCreated = createAction(TAB_CREATED);
export const tabUpdated = createAction(TAB_UPDATED);
export const tabRemoved = createAction(TAB_REMOVED);

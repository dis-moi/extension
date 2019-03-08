import createAction from '../../../utils/createAction';
import { BROWSER_ACTION_CLICKED } from '../../../constants/browser/action';

export const browserActionClicked = createAction(
  BROWSER_ACTION_CLICKED,
  tab => tab,
  tab => ({ tab })
);

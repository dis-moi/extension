import createAction from '../../utils/createAction';
import { PUBLISH_TO_TAB } from '../../constants/ActionTypes';

export default createAction(PUBLISH_TO_TAB)(action => ({ action }));

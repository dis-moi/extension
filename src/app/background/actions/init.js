import { INIT } from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';

export default createAction(
  INIT, 
  ({ onInstalledDetails, criteria, editors }) => ({ onInstalledDetails, criteria, editors }),
);
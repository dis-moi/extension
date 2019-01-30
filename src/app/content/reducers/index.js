import { combineReducers } from 'redux-immutable';

import criteria from './criteria';
import editors from './editors';
import onInstalledDetails from './onInstalledDetails';
import open from './open';
import preferenceScreenPanel from './preferenceScreenPanel';
import recommendations from './recommendations';
import reduced from './reduced';

export default combineReducers({
  criteria,
  editors,
  onInstalledDetails,
  open,
  preferenceScreenPanel,
  recommendations,
  reduced,
});

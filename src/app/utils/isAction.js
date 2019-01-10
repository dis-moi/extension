import { authorizedKeys } from './createAction';

export default action => Object.keys(action).filter(key => !authorizedKeys.includes(key)).length === 0;

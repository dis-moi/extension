import createAction from '../utils/createAction';
import identity from '../utils/identity';

export default (
  type,
  payloadCreator = identity,
  metaCreator = () => ({ background: true })
) => createAction(type, payloadCreator, metaCreator);

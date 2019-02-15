import createAction from '../utils/createAction';
import identity from '../utils/identity';

export default (
  type,
  payloadCreator = identity,
  metaCreator = (meta) => (meta ? { ...meta, background: true } : { background: true })
) => createAction(type, payloadCreator, metaCreator);

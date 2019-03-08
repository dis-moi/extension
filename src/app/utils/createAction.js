import identity from './identity';

// must be manually kept in sync with createAction method
export const authorizedKeys = ['payload', 'meta', 'error', 'type'];

export default (type, payloadCreator = identity, metaCreator = identity) => (payload, meta) => {
  const action = { type };

  if (payload !== undefined) {
    action.payload = payloadCreator(payload);
  }

  if (metaCreator) {
    const actionMeta = metaCreator(meta);
    if (actionMeta !== undefined) {
      action.meta = actionMeta;
    }
  }

  if (payload instanceof Error) {
    action.error = true;
  }

  return action;
};

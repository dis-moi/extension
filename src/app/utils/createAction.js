import identity from './identity';

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

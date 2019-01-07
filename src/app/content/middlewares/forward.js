export const transformForwardedAction = (action) => {
  const { type, payload, meta } = action;
  const { forward, ...metaRest } = meta;

  return {
    type,
    payload,
    meta: { ...metaRest, forwarded: true }
  };
};

export default portCommunication => store => next => (action) => {
  const { meta } = action;

  if (meta && meta.forward) {
    portCommunication.sendBackgroundReduxAction(transformForwardedAction(action));
  }

  return next(action);
};

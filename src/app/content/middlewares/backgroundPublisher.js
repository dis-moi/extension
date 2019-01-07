export const transformBackgroundAction = (action) => {
  const { type, payload, meta } = action;
  const { background, ...metaRest } = meta;

  return {
    type,
    payload,
    meta: { ...metaRest, fromTab: true }
  };
};

export default portCommunication => store => next => (action) => {
  const { meta } = action;

  if (meta && meta.background) {
    portCommunication.sendBackgroundReduxAction(transformBackgroundAction(action));
  }

  return next(action);
};

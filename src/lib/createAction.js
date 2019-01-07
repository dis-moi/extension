export default type => (payload, meta) => {
  const action = { type };

  if (payload !== undefined) {
    action.payload = payload;
  }

  if (meta !== undefined) {
    action.meta = meta;
  }

  if (payload instanceof Error) {
    action.error = true;
  }

  return action;
};

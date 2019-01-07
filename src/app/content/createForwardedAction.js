import createAction from '../../lib/createAction';

export default type => (payload, meta = {}) => {
  const actionCreator = createAction(type);

  return actionCreator(payload, { ...meta, forward: true });
};

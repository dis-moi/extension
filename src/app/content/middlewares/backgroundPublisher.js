export const transformBackgroundAction = (action) => {
  const { type, payload, meta } = action;
  const { background, ...metaRest } = meta;

  return {
    type,
    payload,
    meta: { ...metaRest, fromTab: true }
  };
};

export const sendToBackground = action => new Promise((resolve) => {
  chrome.runtime.sendMessage(action, response => resolve(response));
});

export default store => next => (action) => {
  const { meta } = action;

  if (meta && meta.background) {
    sendToBackground(transformBackgroundAction(action))
      .then(response => console.log('Background respond', response));
  }

  return next(action);
};

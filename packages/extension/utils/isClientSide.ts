export const isClientSide = () => {
  try {
    return Boolean(window && window.document && window.document.createElement);
  } catch (err) {
    return false;
  }
};

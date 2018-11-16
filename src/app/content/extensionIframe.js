const IFRAME_EXTENDED_HEIGHT = '255px'; // @todo
const IFRAME_REDUCED_HEIGHT = '255px'; // @todo

export const getHeight = reduced => (reduced ? IFRAME_REDUCED_HEIGHT : IFRAME_EXTENDED_HEIGHT);

export const create = ({ reduced = false, style = {}, onLoad = () => {} }) => {
  const iframe = document.createElement('iframe');
  iframe.id = 'lmemFrame';
  iframe.width = '255px';
  iframe.height = getHeight(reduced);
  iframe.srcdoc = '<!doctype html><html><head><meta charset="utf-8"></head><body /></html>';
  iframe.onload = onLoad;

  Object.assign(iframe.style, style);

  return iframe;
};

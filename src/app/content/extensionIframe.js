export const create = ({ style = {} }) => {
  const iframe = document.createElement('iframe');
  iframe.id = 'lmemFrame';
  iframe.width = '390px';
  iframe.height = '423px';
  iframe.srcdoc = '<!doctype html><html><head><meta charset="utf-8"></head><body /></html>';

  Object.keys(style).forEach(
    key => iframe.style.setProperty(key, style[key], 'important')
  );

  return iframe;
};


export const append = iframe => new Promise((resolve) => {
  iframe.onload = () => { resolve(iframe.contentDocument); };
  document.body.appendChild(iframe);
});



export const remove = () => {
  const el = document.getElementById('lmemFrame');
  el.remove();
};

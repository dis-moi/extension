import { Promise } from 'es6-promise';
import { iFrameId } from 'app/constants/iframe';

export const create = (style: {
  [key: string]: string | number;
}): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');
  iframe.id = iFrameId;
  iframe.width = '390px';
  iframe.height = '423px';
  iframe.srcdoc =
    '<!doctype html><html lang="fr"><head><title>Bulles</title><meta charset="utf-8"></head><body /></html>';

  Object.keys(style).forEach(key =>
    iframe.style.setProperty(key, String(style[key]), 'important')
  );

  return iframe;
};

export const append = (iframe: HTMLIFrameElement): Promise<Document | null> =>
  new Promise(resolve => {
    iframe.onload = () => {
      resolve(iframe.contentDocument);
    };
    document.body.appendChild(iframe);
  });

export const show = () => {
  const frame = document.querySelector(`#${iFrameId}`);
  if (frame) {
    (frame as HTMLIFrameElement).style.setProperty(
      'display',
      'block',
      'important'
    );
  }
};

export const hide = () => {
  const frame = document.querySelector(`#${iFrameId}`);
  if (frame) {
    (frame as HTMLIFrameElement).style.setProperty(
      'display',
      'none',
      'important'
    );
  }
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Action } from 'redux';
import { navigatedToUrl } from 'libs/store/actions';
import Logger from 'libs/utils/Logger';

type Emit = (action: Action) => void;

const getUrl = () => window.location.href;
let lastUrl: string | undefined;

const createUrlListener = (emit: Emit) => {
  setInterval(() => {
    const currentUrl = getUrl();
    if (currentUrl === lastUrl) return;

    emit(navigatedToUrl(currentUrl));
    lastUrl = currentUrl;
  }, 1000);

  window.addEventListener('popstate', () => {
    emit(navigatedToUrl(window.location.href));
  });

  emit(navigatedToUrl(getUrl()));

  // unsubscribe
  return () => {
    Logger.warn('Unhandled unsubscribe for now');
  };
};

export default createUrlListener;

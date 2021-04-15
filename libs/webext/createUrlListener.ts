/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Action } from 'redux';
import { navigatedToUrl } from 'src/app/store/actions';
import Logger from '../utils/Logger';

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

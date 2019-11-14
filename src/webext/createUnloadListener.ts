/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Action } from 'redux';
import Logger from 'app/utils/Logger';
import { tabRemoved } from 'app/actions';

type Emit = (action: Action) => void;

const createUnloadListener = (emit: Emit) => {
  window.addEventListener('unload', function() {
    emit(tabRemoved());
  });

  // unsubscribe
  return () => {
    Logger.warn('Unhandled unsubscribe for now');
  };
};

export default createUnloadListener;

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Action } from 'redux';
import Logger from 'libs/utils/Logger';
import { tabRemoved } from 'libs/store/actions';

type Emit = (action: Action) => void;

const createUnloadListener = (emit: Emit) => {
  window.addEventListener('beforeunload', function() {
    emit(tabRemoved());
  });

  // unsubscribe
  return () => {
    Logger.warn('Unhandled unsubscribe for now');
  };
};

export default createUnloadListener;

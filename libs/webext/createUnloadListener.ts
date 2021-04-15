/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Action } from 'redux';
import Logger from '../utils/Logger';
import { tabRemoved } from 'src/app/store/actions';

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

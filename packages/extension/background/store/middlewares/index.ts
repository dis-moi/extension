import sagaMiddleware from './saga';
import { Action } from 'redux';
import { createLogger } from 'redux-logger';

export { sagaMiddleware };

export default [
  sagaMiddleware,
  createLogger({
    level: 'info',
    collapsed: true,
    titleFormatter: (action: Action, time: string, took: number): string =>
      `[BACKGROUND] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`,
  }),
];

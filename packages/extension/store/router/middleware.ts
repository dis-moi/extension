import { Middleware } from 'redux';
import { History } from 'history';
import { CALL_HISTORY_METHOD, CallHistoryMethodAction } from './actions';

export const routerMiddleware =
  (history: History): Middleware =>
  () =>
  (next) =>
  (action: CallHistoryMethodAction) => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action);
    }

    const { method, args } = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (history as any)[method](...args);
  };

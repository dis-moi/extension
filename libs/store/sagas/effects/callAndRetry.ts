import { SagaIterator } from 'redux-saga';
import { call, delay } from 'redux-saga/effects';
import * as R from 'ramda';
import secondsToMilliseconds from '../../../utils/secondsToMilliseconds';
import minutesToMilliseconds from '../../../utils/minutesToMilliseconds';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;
type OnErrorCallback = (error: Error, failures: number) => void;
type Options = {
  maximumAttempts: number;
  maximumRetryDelayInMinutes: number;
  onError?: OnErrorCallback;
  onFinalError?: OnErrorCallback;
};

const defaultOptions: Options = {
  maximumAttempts: 10000,
  maximumRetryDelayInMinutes: 60 * 24
};

export const createCallAndRetry = (options: Partial<Options>) =>
  function* callAndRetry<Fn extends AnyFunction>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): SagaIterator {
    const o: Options = R.mergeRight(defaultOptions, options) as Options;

    function* attempt(
      attemptNumber: number,
      ...args: Parameters<Fn>
    ): SagaIterator {
      try {
        return yield call(fn, ...args);
      } catch (e) {
        if ('onError' in o && o.onError) {
          yield call(o.onError, e, attemptNumber);
        }
        if (attemptNumber < o.maximumAttempts) {
          yield delay(
            Math.min(
              secondsToMilliseconds(2 ^ attemptNumber),
              minutesToMilliseconds(o.maximumRetryDelayInMinutes)
            )
          );
          return yield call<typeof attempt>(
            attempt,
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            attemptNumber + 1,
            ...args
          );
        } else {
          if ('onFinalError' in o && o.onFinalError) {
            yield call(o.onFinalError, e, attemptNumber);
          }
          throw e;
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return yield call<typeof attempt>(attempt, 1, ...args);
  };

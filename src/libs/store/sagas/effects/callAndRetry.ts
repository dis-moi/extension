import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import * as R from 'ramda';
import secondsToMilliseconds from 'libs/utils/secondsToMilliseconds';
import minutesToMilliseconds from 'libs/utils/minutesToMilliseconds';
import delay from './delay';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;
type OnErrorCallback = (error: Error, failures: number) => void;
type Options = {
  maximumAttempts?: number;
  maximumRetryDelayInMinutes: number;
  onError?: OnErrorCallback;
  onFinalError?: OnErrorCallback;
};

const defaultOptions: Options = {
  maximumRetryDelayInMinutes: 60 * 24
};

export const createCallAndRetry = (givenOptions: Partial<Options>) =>
  function* callAndRetry<Fn extends AnyFunction>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): SagaIterator {
    const options: Options = R.mergeRight(
      defaultOptions,
      givenOptions
    ) as Options;

    function* attempt(
      attemptNumber: number,
      ...args: Parameters<Fn>
    ): SagaIterator {
      try {
        return yield call(fn, ...args);
      } catch (e) {
        if ('onError' in options && options.onError) {
          yield call(options.onError, e, attemptNumber);
        }
        if (
          !options.maximumAttempts ||
          attemptNumber < options.maximumAttempts
        ) {
          yield delay(
            Math.min(
              secondsToMilliseconds(2 ^ attemptNumber),
              minutesToMilliseconds(options.maximumRetryDelayInMinutes)
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
          if ('onFinalError' in options && options.onFinalError) {
            yield call(options.onFinalError, e, attemptNumber);
          }
          throw e;
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return yield call<typeof attempt>(attempt, 1, ...args);
  };

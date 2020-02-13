import * as R from 'ramda';
import { Action } from 'redux';

type ActionWithMeta<A, M extends string, V> = A & { meta: { [key in M]: V } };

/**
 * Associate any meta to an `Action`, but only if no existing value.
 * @param meta
 * @param value
 */
const assocMetaIfNotGiven = <M extends string, V>(meta: M, value: V) => <
  A extends Action
>(
  action: A
): ActionWithMeta<A, M, V> =>
  R.over(
    R.lensPath(['meta', meta]),
    R.defaultTo(value),
    action
  ) as ActionWithMeta<A, M, V>;

export default assocMetaIfNotGiven;

import * as R from 'ramda';
import { AppAction } from 'app/actions';

type OffsetInfo = {
  current: number;
  fetchedAll: boolean;
};

type UnindexedOffsetState = { _indexed: false } & OffsetInfo;
type IndexedOffsetState = {
  _indexed: true;
} & Record<string | number, OffsetInfo>;

export type OffsetState = IndexedOffsetState | UnindexedOffsetState;

const getOffset = R.path<number>(['meta', 'offset']);
const getOffsetIndex = R.path<string>(['meta', 'offsetIndex']);
const getFetchedAll = R.path<boolean>(['meta', 'fetchedAll']);

export default (SUCCESS: string, indexed?: boolean) => (
  state: OffsetState = indexed
    ? ({ _indexed: true } as IndexedOffsetState)
    : ({
        _indexed: false,
        current: 0,
        fetchedAll: false
      } as UnindexedOffsetState),
  action: AppAction
): OffsetState => {
  if (action.type === SUCCESS) {
    if (indexed) {
      const index: string = getOffsetIndex(action) || 'all';
      return getOffset(action)
        ? {
            ...state,
            [index]: {
              current: getOffset(action) as number,
              fetchedAll: getFetchedAll(action) || false
            }
          }
        : state;
    }

    return getOffset(action)
      ? ({
          ...state,
          current: getOffset(action) as number,
          fetchedAll: Boolean(getFetchedAll(action))
        } as UnindexedOffsetState)
      : state;
  }

  return state;
};

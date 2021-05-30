import * as R from 'ramda';
import {
  AppAction,
  UNSUBSCRIBE,
  UPDATE_MATCHING_CONTEXTS
} from 'libs/store/actions';
import { MatchingContext } from 'app/lmem/matchingContext';
import { ContributorId } from 'app/lmem/contributor';
import { Brand } from '../../../../types';

export type MatchingContextStringId = Brand<string, 'MatchingContextStringId'>;

type MatchingContextWithAssociatedContributors = MatchingContext & {
  associatedContributors: ContributorId[];
};

export type MatchingContextsState = Record<
  string,
  MatchingContextWithAssociatedContributors
>;

export const initialState: MatchingContextsState = {};

const getIdAsString = R.pipe<
  MatchingContext,
  MatchingContext['id'],
  MatchingContextStringId
>(R.prop('id'), id => id.toString() as MatchingContextStringId);

const mergeAssociatedMatchingContexts = (
  fetched: MatchingContextWithAssociatedContributors,
  existing: MatchingContextWithAssociatedContributors
) => ({
  ...fetched,
  associatedContributors: R.uniq([
    ...existing.associatedContributors,
    ...fetched.associatedContributors
  ])
});

const overAssociatedContributors = (fn: R.Arity1Fn) =>
  R.over(R.lensProp('associatedContributors'), fn);

export default (
  state: MatchingContextsState = initialState,
  action: AppAction
): MatchingContextsState => {
  switch (action.type) {
    case UPDATE_MATCHING_CONTEXTS:
      const { contributorId, matchingContexts } = action.payload;

      const matchingContextsWithAssociated = R.pipe<
        MatchingContext[],
        MatchingContextWithAssociatedContributors[],
        MatchingContextsState
      >(
        R.map(R.assoc('associatedContributors', [contributorId])),
        R.indexBy<MatchingContextWithAssociatedContributors>(getIdAsString)
      )(matchingContexts);

      return R.mergeWith(
        mergeAssociatedMatchingContexts,
        matchingContextsWithAssociated,
        state
      );

    case UNSUBSCRIBE:
      const unsubscribedContributorId = action.payload;
      return R.pipe<
        MatchingContextsState,
        MatchingContextsState,
        MatchingContextsState
      >(
        R.mapObjIndexed(
          overAssociatedContributors(
            R.reject(R.equals(unsubscribedContributorId))
          )
        ),
        R.pickBy(R.compose(R.not, R.isEmpty, R.prop('associatedContributors')))
      )(state);

    default:
      return state;
  }
};

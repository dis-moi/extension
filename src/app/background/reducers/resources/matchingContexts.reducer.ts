import * as R from 'ramda';
import { AppAction, UPDATE_MATCHING_CONTEXTS } from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';
import { ContributorId } from 'app/lmem/contributor';
import { Brand } from '../../../../types';

type MatchingContextStringId = Brand<string, 'MatchingContextStringId'>;

type MatchingContextWithAssociatedContributors = MatchingContext & {
  associatedContributors: ContributorId[];
};

export type MatchingContextsState = Record<
  MatchingContextStringId,
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
        R.indexBy(getIdAsString)
      )(matchingContexts);

      return R.mergeWith(
        mergeAssociatedMatchingContexts,
        matchingContextsWithAssociated,
        state
      );

    default:
      return state;
  }
};

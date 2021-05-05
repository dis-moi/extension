import { ContributorId } from 'libs/domain/contributor';
import { MatchingContext } from 'libs/domain/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  subscriptions: ContributorId[] = []
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: subscriptions });

export default fetchMatchingContexts;

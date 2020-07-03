import { ContributorId } from 'app/lmem/contributor';
import { MatchingContext } from 'app/lmem/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  subscriptions: ContributorId[] = []
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: subscriptions });

export default fetchMatchingContexts;

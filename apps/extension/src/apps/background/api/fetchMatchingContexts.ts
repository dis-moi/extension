import { ContributorId } from 'libs/lmem/contributor';
import { MatchingContext } from 'libs/lmem/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  subscriptions: ContributorId[] = []
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: subscriptions });

export default fetchMatchingContexts;

import { MatchingContext } from '../app/lmem/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  subscriptions: number[]
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: subscriptions });

export default fetchMatchingContexts;

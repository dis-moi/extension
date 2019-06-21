import { MatchingContext } from 'app/lmem/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (): Promise<MatchingContext[]> =>
  get('matching-contexts');

export default fetchMatchingContexts;

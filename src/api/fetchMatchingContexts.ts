import { get } from './call';
import { ContributorId } from 'app/lmem/contributor';
import { MatchingContext } from 'app/lmem/matchingContext';

const fetchMatchingContexts = (
  contributorId: ContributorId
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: [contributorId] });

export default fetchMatchingContexts;

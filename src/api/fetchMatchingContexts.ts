import { ContributorId } from 'app/lmem/contributor';
import { MatchingContext } from 'app/lmem/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  contributorId: ContributorId
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: [contributorId] });

export default fetchMatchingContexts;

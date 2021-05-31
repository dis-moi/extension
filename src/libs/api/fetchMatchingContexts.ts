import { ContributorId } from 'libs/lmem/contributor';
import { MatchingContext } from 'libs/lmem/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  contributorId: ContributorId
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: [contributorId] });

export default fetchMatchingContexts;

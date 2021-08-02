import { ContributorId } from 'libs/domain/contributor';
import { MatchingContext } from 'libs/domain/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  contributorId: ContributorId
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: [contributorId] });

export default fetchMatchingContexts;

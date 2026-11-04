import { ContributorId } from '@dismoi/domain/contributor';
import { MatchingContext } from '@dismoi/domain/matchingContext';
import { get } from './call';

const fetchMatchingContexts = (
  contributorId: ContributorId,
): Promise<MatchingContext[]> =>
  get('matching-contexts', { contributors: [contributorId] });

export default fetchMatchingContexts;

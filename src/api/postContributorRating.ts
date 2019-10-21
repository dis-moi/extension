import { post } from './call';
import ContributorRatingType from 'app/lmem/ContributorRatingType';
import { ContributorId } from 'app/lmem/contributor';

export interface ContributorRating {
  contributorId: ContributorId;
  ratingType: ContributorRatingType;
}

const postContributorRating = ({
  contributorId,
  ratingType
}: ContributorRating): Promise<void> =>
  post(`contributors/${contributorId}/ratings`, {
    ratingType
  });

export default postContributorRating;

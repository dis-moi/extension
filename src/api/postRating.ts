import { RatingType } from '../app/lmem/rating';
import { post } from './call';

export interface Rating {
  noticeId: number;
  rating: RatingType;
  url?: string;
  geolocation?: string;
}

const postRating = ({
  noticeId,
  url,
  rating,
  geolocation
}: Rating): Promise<void> =>
  post(`notices/${noticeId}/ratings`, {
    ratingType: rating,
    context: {
      url,
      geolocation
    }
  });

export default postRating;

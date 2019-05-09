import { RatingType } from '../app/lmem/rating';
import { post } from './call';

const postRating = (
  noticeId: number,
  url: string,
  rating: RatingType
): Promise<void> =>
  post(`notices/${noticeId}/ratings`, {
    ratingType: rating,
    context: {
      url,
      geolocation: ''
    }
  });

export default postRating;

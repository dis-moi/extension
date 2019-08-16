export type RatingType =
  | 'like'
  | 'unlike'
  | 'dislike'
  | 'undislike'
  | 'dismiss'
  | 'undismiss'
  | 'display'
  | 'unfold'
  | 'report';

export interface Ratings {
  likes?: number;
  dislikes?: number;
}

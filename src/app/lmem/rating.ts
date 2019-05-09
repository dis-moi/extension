export type RatingType =
  | 'like'
  | 'unlike'
  | 'dislike'
  | 'undislike'
  | 'dismiss'
  | 'undismiss'
  | 'display'
  | 'unfold'
  | 'click-message'
  | 'click-source'
  | 'report';

export interface Ratings {
  likes?: number;
  dislikes?: number;
}

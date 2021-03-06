export enum RatingType {
  LIKE = 'like',
  UNLIKE = 'unlike',
  DISLIKE = 'dislike',
  UNDISLIKE = 'undislike',
  DISMISS = 'dismiss',
  UNDISMISS = 'undismiss',
  DISPLAY = 'display',
  UNFOLD = 'unfold',
  OUTBOUND_CLICK = 'outbound-click',
  BADGED = 'badge',
  REPORT = 'report'
}

export interface Ratings {
  likes?: number;
  dislikes?: number;
}

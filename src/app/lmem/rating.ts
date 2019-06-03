export enum RatingType {
  LIKE = 'like',
  UNLIKE = 'unlike',
  DISLIKE = 'dislike',
  UNDISLIKE = 'undislike',
  DISMISS = 'dismiss',
  UNDISMISS = 'undismiss',
  DISPLAY = 'display',
  UNFOLD = 'unfold',
  CLICK_MESSAGE = 'click-message',
  CLICK_SOURCE = 'click-source',
  REPORT = 'report'
}

export interface Ratings {
  likes?: number;
  dislikes?: number;
}

import { find } from 'ramda';
import { Criterion } from './criterion';
import { Editor } from './editors';

export interface Alternative {
  label: string;
  url_to_redirect: string;
}

export interface Contributor {
  image: string;
  name: string;
  organization: string;
}

export interface Resource {
  author?: string;
  editor: Editor;
  label: string;
  url: string;
}

export interface Notice {
  id: number;
  title: string;
  description: string;
  contributor: Contributor;
  resource: Resource;
  alternatives: Alternative[];
  criteria: Criterion[];
  filters?: Criterion[];
  likes: number;
  dislikes: number;
  valid: boolean;
  visibility: 'public';
}

export interface EnhancedNotice extends Notice {
  liked: boolean;
  justLiked?: boolean;
  disliked: boolean;
  justDisliked?: boolean;
  dismissed: boolean;
  justDismissed?: boolean;
  read?: boolean;
}

/* eslint-disable no-nested-ternary */
export type IgnoringReason = 'dislike' | 'dismiss' | 'other';
export const isIgnored = (notice: EnhancedNotice): boolean =>
  notice.dismissed || notice.disliked;
export const ignoringReason = (notice: EnhancedNotice): IgnoringReason =>
  notice.dismissed ? 'dismiss' : notice.disliked ? 'dislike' : 'other';

export const dismissNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  dismissed: true,
  justDismissed: true
});
export const undismissNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  dismissed: false,
  justDismissed: false
});
export const likeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  liked: true,
  justLiked: true
});
export const unlikeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  liked: false,
  justLiked: false
});
export const dislikeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  disliked: true,
  justDisliked: true
});
export const undislikeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  disliked: false,
  justDisliked: false
});

export const getNotice = <N extends Notice>(
  id: number,
  notices: N[]
): N | undefined => find((notice: N): boolean => notice.id === id, notices);

export const isNoticeValid = (notice: {
  [key: string]: any;
}): notice is Notice => {
  if (Object(notice) !== notice) return false;

  const {
    contributor,
    title,
    description,
    resource,
    criteria,
    alternatives
  } = notice;

  return (
    typeof title === 'string' &&
    typeof description === 'string' &&
    Object(resource) === resource &&
    typeof resource.label === 'string' &&
    (!resource.author || typeof resource.author === 'string') &&
    Object(resource.editor) === resource.editor &&
    typeof resource.editor.label === 'string' &&
    typeof resource.editor.url === 'string' &&
    Object(contributor) === contributor &&
    typeof contributor.name === 'string' &&
    (!criteria ||
      (Array.isArray(criteria) &&
        criteria.every(
          criterion =>
            Object(criterion) === criterion &&
            typeof criterion.label === 'string' &&
            typeof criterion.slug === 'string'
        ))) &&
    (!alternatives ||
      (Array.isArray(alternatives) &&
        alternatives.every(
          alternative =>
            Object(alternative) === alternative &&
            typeof alternative.label === 'string' &&
            typeof alternative.url_to_redirect === 'string'
        )))
  );
};

export const warnIfNoticeInvalid = (notice: Notice): boolean => {
  const valid = isNoticeValid(notice);

  if (!valid) {
    console.warn('Invalid notice not displayed:', notice);
  }

  return valid;
};

export const shouldNoticeBeShown = (notice: EnhancedNotice): boolean =>
  (notice.valid &&
    (!notice.dismissed || notice.justDismissed) &&
    (!notice.disliked || notice.justDisliked)) ||
  false;

export const isRead = (notice: EnhancedNotice) => notice.read === true;

export const isUnread = (notice: EnhancedNotice) => !isRead(notice);

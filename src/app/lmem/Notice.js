export default {
  isIgnored: notice => notice.dismissed || notice.disliked,
  ignoringReason: notice => notice.dismissed ? 'dismiss' : notice.disliked ? 'dislike' : 'other'
};

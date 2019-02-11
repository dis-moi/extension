export default notice =>
  notice.dismissed !== true
  && notice.valid !== false
  && notice.disliked !== true;

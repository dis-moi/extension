export default notice => notice.valid
  && (!notice.dismissed || notice.justDismissed)
  && (!notice.disliked || notice.justDisliked);

import { recommendationIsValid, recommendationFilter } from '../../lmem';

export const getPrefs = state => state.get('prefs');

export const getWebsites = state => getPrefs(state).get('websites');
export const getOnInstalledDetails = state => getPrefs(state).get('onInstalledDetails');
export const getCriteria = state => getPrefs(state).get('criteria');
export const getEditors = state => getPrefs(state).get('editors');
export const getDismissed = state => getPrefs(state).get('dismissedNotices');
export const getLiked = state => getPrefs(state).get('likedNotices');
export const getDisliked = state => getPrefs(state).get('dislikedNotices');

export const getCriterionBySlug = slug => state => getCriteria(state).get(slug);
export const getSelectedCriteria = state => Array.from(getCriteria(state).keys())
  .filter(slug => getCriterionBySlug(slug)(state).get('isSelected'));

export const getEditorById = id => state => getEditors(state).get(id);
export const getExcludedEditors = state => Array.from(getEditors(state).keys())
  .filter(id => getEditorById(id)(state).get('isExcluded'));

export const getInitialContent = state => ({
  onInstalledDetails: getOnInstalledDetails(state),
  criteria: getCriteria(state),
  editors: getEditors(state)
});

export const getNoticeEnhancer = (state) => {
  const dismissed = getDismissed(state);
  const liked = getLiked(state);
  const disliked = getDisliked(state);

  return notice => ({
    ...notice,
    dismissed: dismissed.has(notice.id),
    liked: liked.has(notice.id),
    disliked: disliked.has(notice.id),
    valid: recommendationIsValid(notice),
  });
};

export const getRecommendationsToDisplay = notices => (state) => notices
  .map(getNoticeEnhancer(state))
  .filter(recommendationFilter);


export const getDismissedRecommendations = notices => (state) => notices
  .map(getNoticeEnhancer(state))
  .filter(notice => notice.dismissed);

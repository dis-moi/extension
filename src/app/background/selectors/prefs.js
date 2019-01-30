import { recommendationIsValid, recommendationFilter } from '../../lmem';

export const getPrefs = state => state.get('prefs');

export const getWebsites = state => getPrefs(state).get('websites');
export const getOnInstalledDetails = state => getPrefs(state).get('onInstalledDetails');
export const getCriteria = state => getPrefs(state).get('criteria');
export const getEditors = state => getPrefs(state).get('editors');
export const getDismissed = state => getPrefs(state).get('dismissedRecos');
export const getApproved = state => getPrefs(state).get('approvedRecos');

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

export const getRecommendationEnhancer = (state) => {
  const approvedRecos = getApproved(state);
  const dismissedRecommendations = getDismissed(state);

  return recommendation => ({
    ...recommendation,
    isApproved: approvedRecos.has(recommendation.id) ? true : undefined,
    isDismissed: dismissedRecommendations.has(recommendation.id),
    isValid: recommendationIsValid(recommendation),
  });
};

export const getRecommendationsToDisplay = recommendations => (state) => {
  const recommendationEnhancer = getRecommendationEnhancer(state);

  return recommendations.map(recommendationEnhancer).filter(recommendationFilter);
};

export const getDismissedRecommendations = recommendations => (state) => {
  const recommendationEnhancer = getRecommendationEnhancer(state);

  return recommendations.map(recommendationEnhancer).filter(recommendation => !recommendationFilter(recommendation));
};

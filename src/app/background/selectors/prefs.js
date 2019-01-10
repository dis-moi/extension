import recommendationIsValid from '../../lmem/recommendationIsValid';

export const getWebsites = state => state.get('prefs').get('websites');
export const getOnInstalledDetails = state => state.get('prefs').get('onInstalledDetails');
export const getCriteria = state => state.get('prefs').get('criteria');
export const getEditors = state => state.get('prefs').get('editors');
export const getDismissed = state => state.get('prefs').get('dismissedRecos');
export const getApproved = state => state.get('prefs').get('approvedRecos');

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

  return recommendation => ({
    ...recommendation,
    isApproved: approvedRecos.has(recommendation.id)
  });
};

export const getRecommendationFilter = (state) => {
  const dismissedRecommendations = getDismissed(state);

  return recommendation => !dismissedRecommendations.has(recommendation.id)
      && recommendationIsValid(recommendation);
};

export const getRecommendationsToDisplay = recommendations => (state) => {
  const recommendationEnhancer = getRecommendationEnhancer(state);
  const recommendationFilter = getRecommendationFilter(state);

  return recommendations.filter(recommendationFilter).map(recommendationEnhancer);
};

export const getDismissedRecommendations = recommendations => (state) => {
  const recommendationFilter = getRecommendationFilter(state);

  return recommendations.filter(recommendation => !recommendationFilter(recommendation));
};

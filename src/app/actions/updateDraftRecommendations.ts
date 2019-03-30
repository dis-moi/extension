import { BaseAction } from '.';

interface UpdateDraftRecommendationsAction extends BaseAction {
  type: 'UPDATE_DRAFT_RECOMMENDATIONS';
  payload: { draftRecommendations: {} };
}
export const updateDraftRecommendations = (draftRecommendations: {}): UpdateDraftRecommendationsAction => ({
  type: 'UPDATE_DRAFT_RECOMMENDATIONS',
  payload: { draftRecommendations }
});
export default updateDraftRecommendations;

import { UPDATE_DRAFT_RECOMMENDATIONS } from './../constants/ActionTypes';

export default function (draftRecommendations) {
  return {
    type: UPDATE_DRAFT_RECOMMENDATIONS,
    draftRecommendations
  };
}

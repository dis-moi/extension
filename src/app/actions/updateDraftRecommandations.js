import { UPDATE_DRAFT_RECOMMENDATIONS } from './../constants/ActionTypes';

export default function (draftRecommandations) {
  return {
    type: UPDATE_DRAFT_RECOMMENDATIONS,
    draftRecommandations
  };
}

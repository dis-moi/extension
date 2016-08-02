import { UPDATE_DRAFT_RECOMMANDATIONS } from './../constants/ActionTypes';

export default function (draftRecommandations) {
  return {
    type: UPDATE_DRAFT_RECOMMANDATIONS,
    draftRecommandations
  };
}

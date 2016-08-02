import { UPDATE_DRAFT_RECOMMANDATIONS } from './../constants/ActionTypes';


export function updateDraftRecommandations(draftRecommandations){
    return {
        type: UPDATE_DRAFT_RECOMMANDATIONS,
        draftRecommandations
    };
}

import { MATCHING_OFFERS_FOUND, REMOVE_ALL_MATCHING_OFFERS, RECEIVED_MATCHING_CONTEXTS, DEACTIVATE_FOR_SOME_TIME } from '../constants/ActionTypes'

function tabIdForCurrentMatchingOffer(action) {
    return action.payload.context.request.tabId;
}

const DEACTIVATE_FOR_SOME_TIME_DELAY = 30*60*1000; // ms

export default function(state = {}, action){
    const {type} = action;

    console.log('reducer', type, action);

    switch(type) {
        case MATCHING_OFFERS_FOUND:
            return Object.assign(
                {}, state, {
                    matchingTabs: Object.assign(
                        {}, state.matchingTabs,
                        {
                            [tabIdForCurrentMatchingOffer(action)]: action.payload
                        }
                    )
                }
            )
        case REMOVE_ALL_MATCHING_OFFERS:
            return Object.assign( {}, state, { matchingTabs: {} } );
        case RECEIVED_MATCHING_CONTEXTS:
            return Object.assign( {}, state, { offers: action.payload } );
        case DEACTIVATE_FOR_SOME_TIME:
            return Object.assign(
                {}, state,
                { 
                    preferences: Object.assign(
                        {}, state.preferences,
                        {
                            keepClosedUntil: Date.now() + DEACTIVATE_FOR_SOME_TIME_DELAY
                        }
                    )
                }
            );
        default:
            return state;
    }


}

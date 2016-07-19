import { MATCHING_OFFERS_FOUND, REMOVE_ALL_MATCHING_OFFERS, RECEIVED_MATCHING_CONTEXTS, DEACTIVATE } from '../constants/ActionTypes'
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../constants/preferences'

function tabIdForCurrentMatchingOffer(action) {
    return action.payload.context.request.tabId;
}

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
        case DEACTIVATE:
            const {where, duration} = action;
            const deactivatedPref = state &&  state.preferences && state.preferences.deactivated || {};
            let newDeactivatedPref;

            if(where === DEACTIVATE_EVERYWHERE){
                newDeactivatedPref = Object.assign(
                    {}, deactivatedPref,
                    {
                        deactivatedEverywhereUntil: Date.now() + duration
                    }
                )
            }
            else{
                deactivatedPref.deactivatedWebsites = new Set(deactivatedPref.deactivatedWebsites)
                deactivatedPref.deactivatedWebsites.add(where);
                newDeactivatedPref = deactivatedPref; // mutated
            }

            return Object.assign(
                {}, state,
                { 
                    preferences: Object.assign(
                        {}, state.preferences,
                        {
                            deactivated: newDeactivatedPref
                        }
                    )
                }
            );
        default:
            return state;
    }


}

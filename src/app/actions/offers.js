import { MATCHING_OFFERS_FOUND, ADD_OFFERS } from './../constants/ActionTypes';
import * as _ from 'lodash'

export function findMatchingOffers(details) {
    return (dispatch, getState) => {
        //if ajax request, we reject it
        if(details.type !== "main_frame") return;

        //we find matches
        const matching_offers = _.filter(getState().offers, (item) => {
            return (new RegExp(item.matchingContext.url).test(details.url));
        });

        //if no matching offers, we stop the dispatching
        if(matching_offers.length == 0) return;

        dispatch(matchingOffersFound({
            context: {
                request: details
            },
            matchingOffers: matching_offers
        }));
    };
}

/**
 * Wait for a details object built like this:
 * {
 *      context: {
 *          request: RequestDetails
 *      },
 *      matchingTabs: [offer]
 * }
 * @param details
 * @returns {{type, payload: *}}
 */
export function matchingOffersFound(details) {
    return {
        type: MATCHING_OFFERS_FOUND,
        payload: details
    };
}

export function addOffers(details) {
    return {
        type: ADD_OFFERS,
        payload: details
    };
}

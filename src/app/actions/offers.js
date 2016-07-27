import { MATCHING_OFFERS_FOUND } from './../constants/ActionTypes';


export function matchingOffersFound(details) {
    return {
        type: MATCHING_OFFERS_FOUND,
        payload: details
    };
}

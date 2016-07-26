import { MATCHING_OFFERS_FOUND, REMOVE_ALL_OFFERS, REMOVE_ALL_MATCHING_OFFERS } from './../constants/ActionTypes';


export function matchingOffersFound(details) {
    return {
        type: MATCHING_OFFERS_FOUND,
        payload: details
    };
}

export function flushMatchingOffers(){
    return {
        type: REMOVE_ALL_MATCHING_OFFERS
    };
}

export function flushOffers() {
    return {
        type: REMOVE_ALL_OFFERS
    };
}

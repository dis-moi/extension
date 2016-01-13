import { ALTERNATIVES_FOUND } from './../constants/ActionTypes';
import * as _ from 'lodash'

export function findAlternatives(details) {
    return (dispatch, getState) => {
        //if ajax request, we reject it
        if(details.type !== "main_frame") return;

        //we find matches
        const alternatives = _.filter(getState().offers, (item) => {
            return (new RegExp(item.matchingContext.url).test(details.url));
        });

        //if no matching offers, we stop the dispatching
        if(alternatives.length == 0) return;

        dispatch(alternativesFound({
            context: {
                request: details
            },
            alternatives: alternatives
        }));
    };
}

/**
 * Wait for a details object built like this:
 * {
 *      context: {
 *          request: RequestDetails
 *      },
 *      alternatives: [offer]
 * }
 * @param details
 * @returns {{type, payload: *}}
 */
export function alternativesFound(details) {
    return {
        type: ALTERNATIVES_FOUND,
        payload: details
    };
}
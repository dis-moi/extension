import { ALTERNATIVES_FOUND } from './../constants/ActionTypes';

export function findAlternatives(details) {
    return (dispatch, getState) => {
        //we find matches
        const alternatives = getState().offers.filter((v, k)=>(new RegExp(k, 'i').test(details.url)));

        //if no matching offers, we stop the dispatching
        if(alternatives.size == 0) return;

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
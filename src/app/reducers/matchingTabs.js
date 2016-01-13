import * as _ from 'lodash'

import { MATCHING_OFFERS_FOUND } from '../constants/ActionTypes'

function tabIdForCurrentMatchingOffer(action) {
    return action.payload.context.request.tabId;
}

export default function matchingTabs(state = {}, action) {
    switch (action.type) {
        case MATCHING_OFFERS_FOUND:
            return _.set(_.clone(state, true), tabIdForCurrentMatchingOffer(action), action.payload);

        default:
            return state;
    }
}
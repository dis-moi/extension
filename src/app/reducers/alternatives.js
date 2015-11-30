import Immutable from 'immutable';

import { ALTERNATIVES_FOUND } from '../constants/ActionTypes'

function tabIdForCurrentAlternative(action) {
    return action.payload.context.request.tabId;
}

export default function alternatives(state = Immutable.Map(), action) {
    switch (action.type) {
        case ALTERNATIVES_FOUND:
            return state.set(tabIdForCurrentAlternative(action), action.payload);

        default:
            console.log(state);
            return state;
    }
}
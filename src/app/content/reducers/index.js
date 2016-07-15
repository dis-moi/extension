import { ALTERNATIVE_FOUND, REDUCE_ALTERNATIVE_IFRAME, EXTEND_ALTERNATIVE_IFRAME, DEACTIVATE_FOR_SESSION, DEACTIVATE_FOR_SOME_TIME } from '../../constants/ActionTypes';

export default function(state = {}, action) {
    const {type} = action 

    switch (type) {
        case ALTERNATIVE_FOUND:
            const {alternative} = action;
            return state.set('alternative', alternative);

        case REDUCE_ALTERNATIVE_IFRAME:
            return state.set('reduced', true);

        case EXTEND_ALTERNATIVE_IFRAME:
            return state.set('reduced', false);

        case DEACTIVATE_FOR_SESSION:
            return state.set('open', false);

        case DEACTIVATE_FOR_SOME_TIME:
            return state
                .set('open', false)
                .set('keepClosedForSomeTime', true);

        default:
            return state;
    }
}
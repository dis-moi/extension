import { ALTERNATIVE_FOUND, REDUCE_ALTERNATIVE_IFRAME, EXTEND_ALTERNATIVE_IFRAME, DEACTIVATE } from '../../constants/ActionTypes';

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

        case DEACTIVATE:
            return state.set('open', false);

        default:
            return state;
    }
}
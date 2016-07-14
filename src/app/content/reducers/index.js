import { ALTERNATIVE_FOUND } from '../../constants/ActionTypes';

export default function(state = {}, action) {
    const {type} = action 

    switch (type) {
        case ALTERNATIVE_FOUND:
            const {alternative} = action;
            state.alternative = alternative;
            return state;

        default:
            return state;
    }
}
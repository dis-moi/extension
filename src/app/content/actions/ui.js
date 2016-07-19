import { REDUCE_ALTERNATIVE_IFRAME, EXTEND_ALTERNATIVE_IFRAME } from '../../constants/ActionTypes';

export function reduce() {
    return {
        type: REDUCE_ALTERNATIVE_IFRAME
    };
}

export function extend() {
    return {
        type: EXTEND_ALTERNATIVE_IFRAME
    };
}

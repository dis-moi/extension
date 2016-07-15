import { REDUCE_ALTERNATIVE_IFRAME, EXTEND_ALTERNATIVE_IFRAME, DEACTIVATE_FOR_SESSION, DEACTIVATE_FOR_SOME_TIME } from '../../constants/ActionTypes';

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

export function deactivateForSession() {
    return {
        type: DEACTIVATE_FOR_SESSION
    };
}

export function deactivateForSomeTime() {
    return {
        type: DEACTIVATE_FOR_SOME_TIME
    };
}

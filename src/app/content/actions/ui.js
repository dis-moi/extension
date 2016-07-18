import { REDUCE_ALTERNATIVE_IFRAME, EXTEND_ALTERNATIVE_IFRAME, DEACTIVATE } from '../../constants/ActionTypes';

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

export function deactivate(portCommunication) {
    return details => {
        const action = Object.assign(
            { type: DEACTIVATE },
            details
        );

        portCommunication.sendBackgroundReduxAction(action)
        return action;
    };
}

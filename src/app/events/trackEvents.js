import { MATCHING_OFFERS_FOUND } from '../constants/ActionTypes';
import { trackHeapEvent } from '../actions/heap';

// Arbitrary set max payload size
// @TODO find a nicer way to handle the error
const MAX_PAYLOAD_SIZE = 10000;

/**
 * Logs all actions and states after they are dispatched.
 */
const events = store => next => action => {
    // Check payload size to avoid HTTP 414 Request-URI Too Large url
    let payloadSize = JSON.stringify(action.payload).length
    if (payloadSize>MAX_PAYLOAD_SIZE) {
        console.log("Payload size too large", payloadSize);
        window.heap.track(action.type);
    } else {
        window.heap.track(action.type, action.payload);
    }
    let result = next(action);
    return result
}

export default events;
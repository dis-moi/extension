import { MATCHING_OFFERS_FOUND } from '../constants/ActionTypes';
import { trackHeapEvent } from '../actions/heap';

/**
 * Logs all actions and states after they are dispatched.
 */
const events = store => next => action => {
    window.heap.track(action.type, action.payload);
    let result = next(action);
    return result
}

export default events;
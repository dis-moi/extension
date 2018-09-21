import mapEventFromAction from './eventsMapper';

// Arbitrary set max payload size
// const MAX_PAYLOAD_SIZE = 7800;

/**
 * Logs all actions and states after they are dispatched.
 *
 * We still have issues when the payload is too big and call to heap api returns:
 * Failed to load resource: the server responded with a status of 414 (Request-URI Too Large)
 *
 * One solution could be to track specific events (with the trackSpecificEvents reducer).
 *
 * Another one could be to add try / catch block and just track the event in case the payload 
 * doesn't fit (still better than nothing).
 *
 * I tried to implement the try / catch in the reducer but it seems the API call itself is 
 * asynchronous and doesn't enter the catch block.
 *
 * The solution I found for the moment is to check for the payload size before doing the API
 * call, and if too big (arbitrary limit set) just send the event.
 *
 * Could be implemented in a much nicer way though.
 *
 * bmenant (2018-09-21):
 * - Modified middleware to not track infrastructural events (api/, persist/, etc).
 * - Added an event mapper to exclude some arbitrary properties.
 * - Removed payload size check (it’s has become very very rare)
 */

export default function (action) {
  if (window.heap) {
    window.heap.track(action.type, mapEventFromAction(action));
  }
  else {
    console.log(`Heap analytics disabled: ignore tracking of "${action.type}":`, action);
  }
}
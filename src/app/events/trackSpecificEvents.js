import { MATCHING_OFFERS_FOUND } from '../constants/ActionTypes';
import { trackHeapEvent } from '../actions/heap';

/* Define a list of events we want to catch
 * then send a call to Heap Analytics API with the event name & payload
 */
const events = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ? [
  {
    catch: [MATCHING_OFFERS_FOUND],
    dispatch: trackHeapEvent
  }
] : [];

export default events;

import { HEAP_LIBRARY_LOADED, HEAP_EVENT_TRACKED } from '../constants/ActionTypes';

export function loadHeapLibrary(action) {
  window.heap.load(action.payload.app_id, action.payload.params);
  return { type: HEAP_LIBRARY_LOADED };
}

export function trackHeapEvent(action) {
  console.log('Track heap event');
  window.heap.track(action.type, action.payload);
  return { type: HEAP_EVENT_TRACKED };
}
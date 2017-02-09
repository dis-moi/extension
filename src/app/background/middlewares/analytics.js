import track from '../../analytics/trackEvents.js';

export default function (store){
  return next => action => {
    if (!window.heap) {
      console.log(`Heap analytics disabled: ignore tracking of "${action.type}":`, action);
    }
    else{
      track(action);
    }
    return next(action);
  };
}
import track from './trackEvents.js';

const MAX_PAYLOAD_SIZE = 10000;

export default function(store){
    return next => action => {
        track(action);
        return next(action);
    }
};
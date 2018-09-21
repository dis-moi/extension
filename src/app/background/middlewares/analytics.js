import track from '../../analytics/trackEvents';

export default function (store){
  return next => action => {
    const { type } = action;

    if (!type.startsWith('api/') && !type.startsWith('notify/') && !type.startsWith('persist/')) {
      track(action);
    }

    return next(action);
  };
}
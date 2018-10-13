import { POPUP_CLICK } from '../../constants/ActionTypes';

export default function ({ getCurrentTabs, track }) {
  return store => next => action => {
    const { type } = action;

    if (!type.startsWith('api/') && !type.startsWith('notify/') && !type.startsWith('persist/')) {
      if (type === POPUP_CLICK) {
        new Promise(resolve => getCurrentTabs(tabs => resolve(tabs)))
          .then(tabs => (tabs.length > 0 ? tabs[0].url : undefined))
          .then(currTabUrl => Object.assign(action, {currentHref: currTabUrl}))
          .then(event => track(event));
      }
      else track(action);
    }

    return next(action);
  };
}
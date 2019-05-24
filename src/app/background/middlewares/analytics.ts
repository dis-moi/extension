import { AppAction } from '../../actions';
import { Dispatch } from 'redux';

type Track = (action: AppAction) => void;

export const analytics = (track: Track) => () => (next: Dispatch) => (
  action: AppAction
) => {
  if (
    !action.type.startsWith('api/') &&
    !action.type.startsWith('notify/') &&
    !action.type.startsWith('persist/') &&
    !(action.meta && action.meta.tracked === false)
  ) {
    track(action);
  }

  return next(action);
};

export default analytics;

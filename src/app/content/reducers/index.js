import {
  ALTERNATIVE_FOUND,
  REDUCE_ALTERNATIVE_IFRAME,
  EXTEND_ALTERNATIVE_IFRAME,
  DEACTIVATE,
  TOGGLE_PREFERENCE_PANEL
} from '../../constants/ActionTypes';

export default function (state = {}, action) {
  const { type } = action;

  switch (type) {
    case ALTERNATIVE_FOUND: {
      const { alternative } = action;
      return state.set('alternative', alternative);
    }

    case REDUCE_ALTERNATIVE_IFRAME:
      return state.set('reduced', true);

    case EXTEND_ALTERNATIVE_IFRAME:
      return state.set('reduced', false);

    case DEACTIVATE:
      return state.set('open', false);

    case TOGGLE_PREFERENCE_PANEL:
      return state.set('preferencePanelOpen', !state.get('preferencePanelOpen'));

    default:
      return state;
  }
}
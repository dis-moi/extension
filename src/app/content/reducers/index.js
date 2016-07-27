import {
  ALTERNATIVE_FOUND,
  REDUCE_ALTERNATIVE_IFRAME,
  EXTEND_ALTERNATIVE_IFRAME,
  DEACTIVATE,
  TOGGLE_PREFERENCE_PANEL,
  DEACTIVATED_WEBSITES,
  REACTIVATE_WEBSITE
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

    case DEACTIVATED_WEBSITES:
        const {deactivatedWebsites} = action;
        return state.set('deactivatedWebsites', deactivatedWebsites);

        case REACTIVATE_WEBSITE:
            //const {website} = action;
            // don't remove the website from state.set('deactivatedWebsites')
            // reactivated websites are tracked locally in the PreferencePanel state
            return state;

        default:
            return state;
    }
}
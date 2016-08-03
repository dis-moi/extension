import {
  ALTERNATIVE_FOUND,
  REDUCE_ALTERNATIVE_IFRAME,
  EXTEND_ALTERNATIVE_IFRAME,
  DEACTIVATE,
  OPEN_PREFERENCE_PANEL,
  CLOSE_PREFERENCE_PANEL,
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

    case OPEN_PREFERENCE_PANEL:{
      const { panel } = action;
      return state.set('preferenceScreenPanel', panel);
    }

    case CLOSE_PREFERENCE_PANEL:
      return state.set('preferenceScreenPanel', undefined);

    case DEACTIVATED_WEBSITES:
      const { deactivatedWebsites } = action;
      return state.set('deactivatedWebsites', deactivatedWebsites);

    case REACTIVATE_WEBSITE:
            // const {website} = action;
            // don't remove the website from state.set('deactivatedWebsites')
            // reactivated websites are tracked locally in the PreferenceScreen state
      return state;

    default:
      return state;
  }
}
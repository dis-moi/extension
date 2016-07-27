import { 
  MATCHING_OFFERS_FOUND, 
  RECEIVED_MATCHING_CONTEXTS, 
  DEACTIVATE,
  REACTIVATE_WEBSITE
} from '../constants/ActionTypes';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../constants/preferences';

export default function (state = {}, action) {
  const { type } = action;

  console.log('reducer', type, action);

  switch (type) {
    case RECEIVED_MATCHING_CONTEXTS:
      return Object.assign({}, state, { offers: action.payload });
    case DEACTIVATE:
      const { where, duration } = action;
      const deactivatedPref = state && state.preferences && state.preferences.deactivated || {};
      let newDeactivatedPref;

      if (where === DEACTIVATE_EVERYWHERE) {
        newDeactivatedPref = Object.assign(
          {}, deactivatedPref,
          {
            deactivatedEverywhereUntil: Date.now() + duration
          }
        );
      }
      else {
        deactivatedPref.deactivatedWebsites = new Set(deactivatedPref.deactivatedWebsites);
        deactivatedPref.deactivatedWebsites.add(where);
        newDeactivatedPref = deactivatedPref; // mutated
      }

      return Object.assign(
        {}, state,
        {
          preferences: Object.assign(
            {}, state.preferences,
            {
              deactivated: newDeactivatedPref
            }
          )
        }
      );
      case REACTIVATE_WEBSITE: {
            const {website} = action;

            const deactivatedPref = state &&  state.preferences && state.preferences.deactivated || {};
            let newDeactivatedPref;

            deactivatedPref.deactivatedWebsites = new Set(deactivatedPref.deactivatedWebsites)
            deactivatedPref.deactivatedWebsites.delete(website);
            newDeactivatedPref = deactivatedPref; // mutated

            return Object.assign(
                {}, state,
                { 
                    preferences: Object.assign(
                        {}, state.preferences,
                        {
                            deactivated: newDeactivatedPref
                        }
                    )
                }
            );
        }
    default:
      return state;
  }
}


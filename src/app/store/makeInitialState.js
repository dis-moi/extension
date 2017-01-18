import { Map as ImmutableMap, Set as ImmutableSet, fromJS } from 'immutable';

/**
 * When the redux store starts empty on first use (no store in local/chrome storage)
 * this function creates the initial state
 * Among other things, this is also intended to document the state structure
 */
export default function (){
  return fromJS({
    prefs: {
      websites: new ImmutableMap(),
      criteria: new ImmutableMap(),
      editors: new ImmutableMap(),
      dismissedRecos: new ImmutableSet(),
      approvedRecos: new ImmutableSet()
    },
    notPrefs: {
      onInstalledDetails: new ImmutableMap(),
      matchingContexts: new ImmutableSet(),
      draftRecommendations: new ImmutableSet()
    }
  });
}
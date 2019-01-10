import findMatchingOffersAccordingToPreferences from '../../lmem/findMatchingOffersAccordingToPreferences';
import { getWebsites } from './prefs';
import { getDrafRecommendations, getMatchingContexts } from './resources';

// eslint-disable-next-line import/prefer-default-export
export const findTriggeredContexts = state => url => findMatchingOffersAccordingToPreferences(
  url,
  getMatchingContexts(state),
  getDrafRecommendations(state),
  getWebsites(state),
);

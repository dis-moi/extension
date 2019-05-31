import { findMatchingOffersAccordingToPreferences } from '../../lmem/matchingContext';
import { getDraftNotices, getMatchingContexts } from './resources';
import { BackgroundState } from '../reducers';

export const findTriggeredContexts = (state: BackgroundState) => (
  url: string
) =>
  findMatchingOffersAccordingToPreferences(
    url,
    getMatchingContexts(state),
    getDraftNotices(state)
  );

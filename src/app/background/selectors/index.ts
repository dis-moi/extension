import { PersistedState } from 'redux-persist';
import { findMatchingOffersAccordingToPreferences } from '../../lmem/matchingContext';
import { getDraftNotices, getMatchingContexts } from './resources';
import { BackgroundState } from '../reducers';
import { createSelector } from 'reselect';
import { InstallationDetails } from 'app/lmem/installation';
import isBulleVersionNumber from 'app/lmem/isBulleVersionNumber';
import { getInstallationDetails } from './installationDetails';
import { areTosAccepted } from './prefs';
import { getNbSubscriptions } from './subscriptions.selectors';

export const findTriggeredContexts = (state: BackgroundState) => (
  url: string
) =>
  findMatchingOffersAccordingToPreferences(
    url,
    getMatchingContexts(state),
    getDraftNotices(state)
  );

export const isAnUpdate = createSelector(
  getInstallationDetails,
  (installationDetails: InstallationDetails) =>
    installationDetails.reason === 'update'
);

export const isAnUpdateFromLmem = createSelector(
  getInstallationDetails,
  (installationDetails: InstallationDetails) => {
    const { reason, previousVersion, version } = installationDetails;

    return (
      !!previousVersion &&
      reason === 'update' &&
      !isBulleVersionNumber(previousVersion) &&
      isBulleVersionNumber(version)
    );
  }
);

export const isInstallationComplete = createSelector(
  [isAnUpdate, areTosAccepted, getNbSubscriptions],
  (updated, tosAccepted, nbSubscriptions) =>
    updated && tosAccepted && nbSubscriptions > 0
);

export const isOnboardingRequired = createSelector(
  [isInstallationComplete],
  clean => !clean
);

export const getPersistState = (state: PersistedState) => state._persist;

export const isRehydrated = createSelector(
  [getPersistState],
  persistState => (persistState ? persistState.rehydrated : false)
);

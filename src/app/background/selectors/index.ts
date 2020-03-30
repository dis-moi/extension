import { PersistedState } from 'redux-persist';
import { findMatchingOffersAccordingToPreferences } from '../../lmem/matchingContext';
import { getMatchingContexts } from './resources';
import { BackgroundState } from '../reducers';
import { createSelector } from 'reselect';
import { InstallationDetails } from 'app/lmem/installation';
import { getInstallationDetails } from './installationDetails';
import { areTosAccepted, getRead } from './prefs';
import { getNoticesIdsOnTab } from './tabs';
import { getNotice } from '../../lmem/notice';

export const findTriggeredContexts = (state: BackgroundState) => (
  url: string
) => findMatchingOffersAccordingToPreferences(url, getMatchingContexts(state));

export const isAnUpdate = createSelector(
  getInstallationDetails,
  ({ reason }: InstallationDetails) => reason !== 'install'
);

export const isInstallationComplete = createSelector(
  [areTosAccepted],
  tosAccepted => tosAccepted
);

export const isOnboardingRequired = createSelector(
  [isInstallationComplete],
  clean => !clean
);

export const getPersistState = (state: PersistedState) => state._persist;

export const isRehydrated = createSelector([getPersistState], persistState =>
  persistState ? persistState.rehydrated : false
);

export const getNumberOfUnreadNoticesOnTab = (tabId: number) =>
  createSelector(
    [getNoticesIdsOnTab(tabId), getRead],
    (noticesIds, readNoticesIds) =>
      noticesIds
        ? noticesIds.filter(noticeId => !readNoticesIds.includes(noticeId))
            .length
        : 0
  );

export const getNotices = (state: BackgroundState) => {
  return state.resources.notices;
};

export const getNoticeById = (id: number) => (state: BackgroundState) =>
  getNotice(Number(id), getNotices(state));

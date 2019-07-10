import { createSelector } from 'reselect';
import { RouteComponentProps } from 'react-router';
import { getLocation } from 'connected-react-router';
import { getFormValues } from 'redux-form';

import {
  getNotice,
  isMarkedUnread,
  shouldNoticeBeShown,
  Contribution
} from 'app/lmem/notice';
import { InstallationDetails } from 'app/lmem/installation';
import { OpenState, MountedState, TitleState, UIState } from '../reducers/ui';
import { ContentState } from '../store';

export const getNotices = (state: ContentState) => state.notices;

export const getNoticesToDisplay = createSelector(
  getNotices,
  notices => notices.filter(shouldNoticeBeShown)
);

export const getMarkedUnreadNotices = (state: ContentState) =>
  getNoticesToDisplay(state).filter(isMarkedUnread);

export const hasMarkedUnreadNotices = (state: ContentState) =>
  getMarkedUnreadNotices(state).length > 0;

export const getNoticeById = (
  state: ContentState,
  {
    match: {
      params: { id }
    }
  }: RouteComponentProps<{ id?: string }>
) => getNotice(Number(id), getNotices(state));

export const getUI = (state: ContentState): UIState => state.ui;
export const isOpen = (state: ContentState): OpenState => getUI(state).open;
export const isMounted = (state: ContentState): MountedState =>
  getUI(state).mounted;
export const getTitle = (state: ContentState): TitleState => getUI(state).title;

export const hasNoticesToDisplay = createSelector(
  getNoticesToDisplay,
  noticesToDisplay => noticesToDisplay.length > 0
);

export const getOnInstalledDetails = (
  state: ContentState
): InstallationDetails => state.installationDetails;

export const getExtensionInstallationDate = createSelector(
  getOnInstalledDetails,
  (details: InstallationDetails) =>
    details.datetime ? new Date(details.datetime) : undefined
);

export const getTab = (state: ContentState) => state.tab;

export const getURL = (state: State) => {
  const tab = getTab(state);
  return tab ? tab.url : '';
};

export const getPathname = (state: ContentState) => getLocation(state).pathname;

export const isNoticeContext = (state: ContentState) => {
  const pathname = getPathname(state);
  return pathname.includes('notice') || pathname.includes('preview');
};

export const getContribution = (state: State): Contribution =>
  // @ts-ignore
  getFormValues('contribution')(state);

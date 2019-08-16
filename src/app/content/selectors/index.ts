import { createSelector } from 'reselect';
import { RouteComponentProps } from 'react-router';
import { getLocation } from 'connected-react-router';
import {
  getNotice,
  isMarkedUnread,
  shouldNoticeBeShown
} from 'app/lmem/notice';
import { InstallationDetails } from 'app/lmem/installation';
import { OpenState, MountedState, TitleState, UIState } from '../reducers/ui';
import { State } from '../store';

export const getNotices = (state: State) => state.notices;

export const getNoticesToDisplay = createSelector(
  getNotices,
  notices => notices.filter(shouldNoticeBeShown)
);

export const getMarkedUnreadNotices = (state: State) =>
  getNoticesToDisplay(state).filter(isMarkedUnread);

export const hasMarkedUnreadNotices = (state: State) =>
  getMarkedUnreadNotices(state).length > 0;

export const getNoticeById = (
  state: State,
  {
    match: {
      params: { id }
    }
  }: RouteComponentProps<{ id?: string }>
) => getNotice(Number(id), getNotices(state));

export const getUI = (state: State): UIState => state.ui;
export const isOpen = (state: State): OpenState => getUI(state).open;
export const isMounted = (state: State): MountedState => getUI(state).mounted;
export const getTitle = (state: State): TitleState => getUI(state).title;

export const hasNoticesToDisplay = createSelector(
  getNoticesToDisplay,
  noticesToDisplay => noticesToDisplay.length > 0
);

export const getOnInstalledDetails = (state: State): InstallationDetails =>
  state.installationDetails;

export const getExtensionInstallationDate = createSelector(
  getOnInstalledDetails,
  (details: InstallationDetails) =>
    details.datetime ? new Date(details.datetime) : undefined
);

export const getTab = (state: State) => state.tab;

export const getPathname = (state: State) => getLocation(state).pathname;

export const isNoticeContext = (state: State) =>
  getPathname(state).includes('notice');

import { createSelector } from 'reselect';
import { RouteComponentProps } from 'react-router';
import { getLocation } from 'connected-react-router';
import {
  getFormMeta,
  getFormSyncErrors,
  getFormValues,
  RegisteredFieldState
} from 'redux-form';
import * as R from 'ramda';
import {
  getNotice,
  isUnread,
  shouldNoticeBeShown,
  Contribution,
  compareUnread
} from 'app/lmem/notice';
import { InstallationDetails } from 'app/lmem/installation';
import { ContentState } from '../store';
import { getRegisteredFieldsPaths } from 'app/utils/form';
import {
  getContributors,
  getSubscriptions
} from 'app/store/selectors/contributors.selectors';
import { findItemById } from 'app/utils/findItemById';
import { StatefulContributor } from 'app/lmem/contributor';
import { makeGetRouteParam } from 'app/store/selectors';
export * from './serviceMessage.selectors';
export * from './ui.selectors';

export const getNotices = (state: ContentState) => state.notices;

export const getNoticesToDisplay = createSelector(getNotices, notices =>
  notices.filter(shouldNoticeBeShown).sort(compareUnread)
);

export const getUnreadNotices = (state: ContentState) =>
  getNoticesToDisplay(state).filter(isUnread);

export const hasUnreadNotices = (state: ContentState) =>
  getUnreadNotices(state).length > 0;

export const getNoticeIdFromRouteParam = makeGetRouteParam('id');
export const getNoticeFromRoute = createSelector(
  [getNotices, getNoticeIdFromRouteParam],
  (notices, noticeId) => getNotice(Number(noticeId), notices)
);

export const getNoticeById = (
  state: ContentState,
  {
    match: {
      params: { id }
    }
  }: RouteComponentProps<{ id?: string }>
) => getNotice(Number(id), getNotices(state));

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

export const getPathname = (state: ContentState) => getLocation(state).pathname;

export const isNoticeContext = (state: ContentState) => {
  const pathname = getPathname(state);
  return (
    pathname.includes('notice') ||
    pathname.includes('contribute') ||
    pathname.includes('question')
  );
};

export const getContribution = (state: ContentState): Contribution =>
  getFormValues('contribution')(state) as Contribution;

export const getQuestion = (state: ContentState): Contribution =>
  getFormValues('question')(state) as Contribution;

export const getFormState = (formName: string) => (state: ContentState) =>
  state.form[formName];

export const getFormRegisteredFields = (formName: string) => (
  state: ContentState
): RegisteredFieldState[] => {
  const form = getFormState(formName)(state);
  return R.path(['registeredFields'], form) || [];
};

const getFieldPathErrorMessage = (state: ContentState, formName: string) => (
  fieldPath: string[]
) => R.path<string>(fieldPath, getFormSyncErrors(formName)(state));

const isFieldPathTouched = (state: ContentState, formName: string) => (
  fieldPath: string[]
) =>
  R.path<boolean>(fieldPath.concat('touched'), getFormMeta(formName)(state)) ||
  false;

export const getFlatFormErrors = (formName: string) => (
  state: ContentState
): string[] =>
  R.pipe(
    getFormRegisteredFields(formName),
    getRegisteredFieldsPaths,
    R.map(
      R.ifElse(
        isFieldPathTouched(state, formName),
        getFieldPathErrorMessage(state, formName),
        R.always(undefined)
      )
    ),
    R.filter(Boolean)
  )(state);

export const getContributorIdFromRouteParam = makeGetRouteParam('id');

export const getCurrentContributor = createSelector(
  [getContributors, getContributorIdFromRouteParam],
  (contributors, contributorId) =>
    findItemById<StatefulContributor>(Number(contributorId))(contributors)
);

export const getSubscriptionsIds = createSelector(
  [getSubscriptions],
  subscriptions => subscriptions.map(subscription => subscription.id)
);

export const isNoticeRelayed = createSelector(
  [getNoticeFromRoute, getSubscriptionsIds],
  (notice, subscriptionsIds) =>
    notice?.contributor && !subscriptionsIds.includes(notice?.contributor.id)
);

export const getNoticeRelayer = createSelector(
  [getNoticeFromRoute, getSubscriptionsIds, isNoticeRelayed],
  (notice, subscriptionsIds, relayedNotice) =>
    relayedNotice
      ? notice?.relayers
          .filter(c => typeof c !== 'undefined')
          .find(relayer => subscriptionsIds.includes(relayer.id))
      : undefined
);

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
  compareUnread,
  Question,
  isRelayed,
  getRelayer
} from 'libs/domain/notice';
import { InstallationDetails } from 'libs/domain/installation';
import { getRegisteredFieldsPaths } from 'libs/utils/form';
import {
  getContributors,
  getSubscriptions
} from 'libs/store/selectors/contributors.selectors';
import { findItemById } from 'libs/utils/findItemById';
import { StatefulContributor } from 'libs/domain/contributor';
import { makeGetRouteParam } from 'libs/store/selectors';
import { getCurrentLng } from 'libs/i18n';
import sortByLocale from 'libs/utils/sortByLocale';
import { ContentState } from 'app/content/store/reducers';
export * from './serviceMessage.selectors';
export * from './ui.selectors';
export * from './news.selectors';

export const getNotices = (state: ContentState) => state.notices;

export const getNoticesToDisplay = createSelector(getNotices, notices =>
  sortByLocale(
    notices.filter(shouldNoticeBeShown).sort(compareUnread),
    getCurrentLng()
  )
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

export const getQuestion = (state: ContentState): Question =>
  getFormValues('question')(state) as Question;

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
  [getSubscriptionsIds, getNoticeFromRoute],
  isRelayed
);

export const getNoticeRelayer = createSelector(
  [getSubscriptionsIds, getNoticeFromRoute],
  getRelayer
);

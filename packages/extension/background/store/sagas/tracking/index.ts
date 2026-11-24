import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import PlausibleTracker from 'libs/tracking/plausible';
import { TrackedUrl, screenUrl, siteUrl } from 'libs/tracking/trackedUrl';
import {
  BROWSER_ACTION_CLICKED,
  CLOSE,
  INSTALLATION_DETAILS,
  LOCATION_CHANGED,
  NOTICE_BADGED,
  NOTICE_DISPLAYED,
  NOTICE_UNFOLDED,
  NOTICES_FOUND,
  OUTBOUND_LINK_CLICKED,
  SUBSCRIBE,
  UNSUBSCRIBE,
  TOS_ACCEPTED,
  AppAction,
  BaseAction,
  BrowserActionClickedAction,
  CloseAction,
  ContributorAction,
  FeedbackOnNoticeAction,
  InstallationDetailsAction,
  LocationChangedAction,
  NoticeBadgedAction,
  NoticeDisplayedAction,
  NoticesFoundAction,
  ReceivedOutboundLinkClickedAction,
  TosAcceptedAction,
  UnfoldNoticeAction,
  getURLFromActionMeta,
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { isFeedBackRatingAction } from 'app/background/store/sagas/ratings/notices.saga';
import {
  getNoticeById,
  getNumberOfUnreadNoticesOnTab,
} from 'app/background/store/selectors';
import { getNumberOfNoticesOnTab } from 'app/background/store/selectors/tabs';
import { Level } from 'libs/utils/Logger';

type EventProps = Record<string, string | number | boolean>;

/** The site the action happened on, reduced to what may leave the browser. */
const siteOf = (action: BaseAction): TrackedUrl =>
  siteUrl(getURLFromActionMeta(action));

/** Analytics must never break the extension: failures are only reported. */
const reportingFailures = <A extends BaseAction>(
  worker: (action: A) => SagaIterator,
) =>
  function* (action: A): SagaIterator {
    try {
      yield call(worker, action);
    } catch (e) {
      yield put(createErrorAction()(e as Error, { severity: Level.WARN }));
    }
  };

const trackWith = (tracker: PlausibleTracker) =>
  function* (): SagaIterator {
    function* trackEvent(
      name: string,
      action: BaseAction,
      props?: EventProps,
    ): SagaIterator {
      yield call([tracker, tracker.track], {
        name,
        url: siteOf(action),
        ...(props && { props }),
      });
    }

    function* trackNoticeEvent(
      name: string,
      action: NoticeDisplayedAction | UnfoldNoticeAction,
    ): SagaIterator {
      const notice = yield select(getNoticeById(action.payload));
      yield call(trackEvent, name, action, {
        notice_id: notice?.id ?? action.payload,
        contributor: notice?.contributor?.name ?? '',
      });
    }

    yield takeEvery(
      NOTICES_FOUND,
      reportingFailures(function* (action: NoticesFoundAction): SagaIterator {
        yield call(trackEvent, 'notices_found', action, {
          notices_count: action.payload.notices.length,
        });
      }),
    );

    yield takeLatest(
      (action: AppAction) =>
        action.type === LOCATION_CHANGED &&
        action.payload.location.pathname !== '/',
      reportingFailures(function* (
        action: LocationChangedAction,
      ): SagaIterator {
        yield call(
          [tracker, tracker.trackPageview],
          screenUrl(action.payload.location.pathname),
        );
      }),
    );

    yield takeLatest(
      INSTALLATION_DETAILS,
      reportingFailures(function* (
        action: InstallationDetailsAction,
      ): SagaIterator {
        const { reason, version } = action.payload.installationDetails;
        yield call(trackEvent, 'install', action, { reason, version });
      }),
    );

    yield takeEvery(
      BROWSER_ACTION_CLICKED,
      reportingFailures(function* (
        action: BrowserActionClickedAction,
      ): SagaIterator {
        yield call(trackEvent, 'browser_action_clicked', action);
      }),
    );

    yield takeLatest(
      CLOSE,
      reportingFailures(function* (action: CloseAction): SagaIterator {
        yield call(trackEvent, 'close', action, {
          cause: action.payload.cause.toString(),
        });
      }),
    );

    yield takeLatest(
      TOS_ACCEPTED,
      reportingFailures(function* (action: TosAcceptedAction): SagaIterator {
        yield call(trackEvent, 'tos_accepted', action);
      }),
    );

    yield takeEvery(
      NOTICE_BADGED,
      reportingFailures(function* (action: NoticeBadgedAction): SagaIterator {
        if (!action.meta.tab) return;
        const notice = yield select(getNoticeById(action.payload));
        const noticesNumber = yield select(
          getNumberOfNoticesOnTab(action.meta.tab.id),
        );
        const unreadNoticesNumber = yield select(
          getNumberOfUnreadNoticesOnTab(action.meta.tab.id),
        );
        yield call(trackEvent, 'notice_badged', action, {
          notice_id: notice?.id ?? action.payload,
          color: unreadNoticesNumber > 0 ? 'blue' : 'grey',
          notices_count: noticesNumber,
        });
      }),
    );

    yield takeEvery(
      NOTICE_DISPLAYED,
      reportingFailures(function* (
        action: NoticeDisplayedAction,
      ): SagaIterator {
        yield call(trackNoticeEvent, 'notice_displayed', action);
      }),
    );

    yield takeEvery(
      NOTICE_UNFOLDED,
      reportingFailures(function* (action: UnfoldNoticeAction): SagaIterator {
        yield call(trackNoticeEvent, 'notice_unfolded', action);
      }),
    );

    yield takeLatest(
      isFeedBackRatingAction,
      reportingFailures(function* (
        action: FeedbackOnNoticeAction,
      ): SagaIterator {
        const notice = yield select(getNoticeById(action.payload.id));
        yield call(trackEvent, 'notice_feedback', action, {
          notice_id: notice?.id ?? action.payload.id,
          feedback: action.payload.feedback,
        });
      }),
    );

    yield takeLatest(
      OUTBOUND_LINK_CLICKED,
      reportingFailures(function* (
        action: ReceivedOutboundLinkClickedAction,
      ): SagaIterator {
        if (!action.meta.tab?.url) return;
        yield call(trackEvent, 'outbound_link_clicked', action);
      }),
    );

    yield takeEvery(
      [SUBSCRIBE, UNSUBSCRIBE],
      reportingFailures(function* (action: ContributorAction): SagaIterator {
        yield call(
          trackEvent,
          action.type === SUBSCRIBE ? 'subscribe' : 'unsubscribe',
          action,
          { contributor_id: action.payload },
        );
      }),
    );
  };

// eslint-disable-next-line @typescript-eslint/no-empty-function
function* trackNothing(): SagaIterator {}

/** Without a tracker (not configured, or Do Not Track), nothing is sent. */
export default (tracker?: PlausibleTracker) =>
  tracker ? trackWith(tracker) : trackNothing;

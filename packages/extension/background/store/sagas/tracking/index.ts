import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import PlausibleTracker from 'libs/tracking/plausible';
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

export default (tracker?: PlausibleTracker) =>
  function* (): SagaIterator {
    try {
      if (!tracker) return;

      yield takeEvery(
        [NOTICES_FOUND],
        function* (action: NoticesFoundAction): SagaIterator {
          try {
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.trackPageview], url);
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeLatest(
        (action: AppAction) =>
          action.type === LOCATION_CHANGED &&
          action.payload.location.pathname !== '/',
        function* (action: LocationChangedAction): SagaIterator {
          try {
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.trackPageview], url);
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeLatest(
        INSTALLATION_DETAILS,
        function* (action: InstallationDetailsAction): SagaIterator {
          try {
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.track], {
              name: 'install',
              url: url || 'extension://install',
              props: {
                reason: action.payload.installationDetails.reason,
                version: action.payload.installationDetails.version,
              },
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeEvery(
        BROWSER_ACTION_CLICKED,
        function* (action: BrowserActionClickedAction): SagaIterator {
          try {
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.track], {
              name: 'browser_action_clicked',
              url: url || 'extension://browser-action',
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeLatest(CLOSE, function* (action: CloseAction): SagaIterator {
        try {
          const url = getURLFromActionMeta(action);
          yield call([tracker, tracker.track], {
            name: 'close',
            url: url || 'extension://close',
            props: { cause: action.payload.cause.toString() },
          });
        } catch (e) {
          yield put(createErrorAction()(e, { severity: Level.WARN }));
        }
      });

      yield takeLatest(
        TOS_ACCEPTED,
        function* (action: TosAcceptedAction): SagaIterator {
          try {
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.track], {
              name: 'tos_accepted',
              url: url || 'extension://tos',
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeEvery(
        NOTICE_BADGED,
        function* (action: NoticeBadgedAction): SagaIterator {
          try {
            if (action.meta.tab) {
              const notice = yield select(getNoticeById(action.payload));
              const noticesNumber = yield select(
                getNumberOfNoticesOnTab(action.meta.tab.id),
              );
              const unreadNoticesNumber = yield select(
                getNumberOfUnreadNoticesOnTab(action.meta.tab.id),
              );
              const color = unreadNoticesNumber > 0 ? 'blue' : 'grey';
              const url = getURLFromActionMeta(action);
              yield call([tracker, tracker.track], {
                name: 'notice_badged',
                url: url || 'extension://badge',
                props: {
                  notice_id: notice?.id ?? action.payload,
                  color,
                  notices_count: noticesNumber,
                },
              });
            }
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeEvery(
        NOTICE_DISPLAYED,
        function* (action: NoticeDisplayedAction): SagaIterator {
          try {
            const notice = yield select(getNoticeById(action.payload));
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.track], {
              name: 'notice_displayed',
              url: url || 'extension://notice',
              props: {
                notice_id: notice?.id ?? action.payload,
                contributor: notice?.contributor?.name ?? '',
              },
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeEvery(
        NOTICE_UNFOLDED,
        function* (action: UnfoldNoticeAction): SagaIterator {
          try {
            const notice = yield select(getNoticeById(action.payload));
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.track], {
              name: 'notice_unfolded',
              url: url || 'extension://notice',
              props: {
                notice_id: notice?.id ?? action.payload,
                contributor: notice?.contributor?.name ?? '',
              },
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeLatest(
        isFeedBackRatingAction,
        function* (action: FeedbackOnNoticeAction): SagaIterator {
          try {
            const notice = yield select(getNoticeById(action.payload.id));
            const url = getURLFromActionMeta(action);
            yield call([tracker, tracker.track], {
              name: 'notice_feedback',
              url: url || 'extension://notice',
              props: {
                notice_id: notice?.id ?? action.payload.id,
                feedback: action.payload.feedback,
              },
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeLatest(
        OUTBOUND_LINK_CLICKED,
        function* (action: ReceivedOutboundLinkClickedAction): SagaIterator {
          try {
            if (action.meta.tab?.url) {
              yield call([tracker, tracker.track], {
                name: 'outbound_link_clicked',
                url: action.meta.tab.url,
              });
            }
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );

      yield takeEvery(
        [SUBSCRIBE, UNSUBSCRIBE],
        function* (action: ContributorAction): SagaIterator {
          try {
            const url = getURLFromActionMeta(action);
            const eventName =
              action.type === SUBSCRIBE ? 'subscribe' : 'unsubscribe';
            yield call([tracker, tracker.track], {
              name: eventName,
              url: url || 'extension://subscription',
              props: { contributor_id: action.payload },
            });
          } catch (e) {
            yield put(createErrorAction()(e, { severity: Level.WARN }));
          }
        },
      );
    } catch (e) {
      createErrorAction()(e, { severity: Level.WARN });
    }
  };

import * as R from 'ramda';
import {
  TAB_CREATED,
  TAB_REMOVED,
  TAB_UPDATED
} from 'app/constants/browser/tabs';
import Tab from 'app/lmem/tab';
import {
  findAndTransformNotice,
  findNoticeAndApplyFeedback,
  markNoticeRead,
  Notice,
  NoticeFeedbackType,
  StatefulNotice
} from 'app/lmem/notice';
import { AppAction, isTabReadyAction } from 'app/actions';
import { ReceivedAction } from 'webext/createMessageHandler';

export interface TabWithNotices extends Tab {
  notices?: Notice[];
}

export interface TabsState {
  [tabId: string]: TabWithNotices;
}

export const initialState: TabsState = {};

const addOrUpdateTab = (tab: Tab) => (state: TabsState): TabsState =>
  R.assoc(tab.id.toString(), R.merge(state[tab.id.toString()], tab), state);
const removeTabFromList = (tab: Tab) => (state: TabsState): TabsState =>
  R.dissoc(tab.id.toString(), state);

const markTabReady = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'ready'], true, state);

const markTabAsOptions = (tab: Tab) => (state: TabsState): TabsState =>
  R.assocPath([tab.id.toString(), 'options'], true, state);

const overTabNotices = (tab: Tab) => R.over(R.lensPath([tab.id, 'notices']));

const saveNotices = (tab: Tab, notices: StatefulNotice[]) => (
  state: TabsState
) => overTabNotices(tab)(R.always(notices), state);

const saveReadStatus = (tab: Tab, noticeId: number) => (state: TabsState) =>
  overTabNotices(tab)(findAndTransformNotice(noticeId, markNoticeRead), state);

const saveFeedback = (
  tab: Tab,
  noticeId: number,
  feedbackType: NoticeFeedbackType
) => (state: TabsState) =>
  overTabNotices(tab)(
    findNoticeAndApplyFeedback(noticeId, feedbackType),
    state
  );

// We can only use this on actions we know we received from content or options
const getTabFromReceivedAction = <A extends AppAction>(action: AppAction) =>
  (action as A & ReceivedAction).meta.tab;

export default function(state = initialState, action: AppAction) {
  switch (action.type) {
    case 'OPTIONS_TAB_OPENED':
      return markTabAsOptions(action.payload)(state);
    case TAB_CREATED:
    case TAB_UPDATED:
      return addOrUpdateTab(action.payload.tab)(state);
    case TAB_REMOVED:
      return removeTabFromList(action.payload.tab)(state);
    case 'LISTENING_ACTIONS_READY':
      return action.meta.tab
        ? R.pipe(
            markTabReady(action.meta.tab),
            isTabReadyAction(action)
              ? markTabAsOptions(action.meta.tab)
              : R.identity
          )(state)
        : state;
    case 'NOTICES_FOUND':
      return saveNotices(action.meta.tab, action.payload.notices)(state);
    case 'MARK_NOTICE_READ':
      return saveReadStatus(getTabFromReceivedAction(action), action.payload)(
        state
      );
    case 'FEEDBACK_ON_NOTICE':
      return saveFeedback(
        getTabFromReceivedAction(action),
        action.payload.id,
        action.payload.feedback
      )(state);

    default:
      return state;
  }
}

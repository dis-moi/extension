import {
  INIT,
  CONTEXT_TRIGGERED,
  RECO_DISPLAYED,
  NOTICE_IGNORED,
  MATCH_CONTEXT,
  MATCH_CONTEXT_FAILURE,
  CONTEXT_TRIGGER_FAILURE
} from '../../constants/ActionTypes';
import Notice from '../../lmem/Notice'
import createAction from '../../utils/createAction';

export const init = createAction(
  INIT,
  ({ onInstalledDetails, criteria, editors }) => ({ onInstalledDetails, criteria, editors }),
  tab => ({ tab })
);

export const matchContext = createAction(
  MATCH_CONTEXT,
  context => context,
  tab => ({ tab }),
);

export const matchContextFailure = createAction(
  MATCH_CONTEXT_FAILURE,
  error => ({ error })
);

export const contextTriggered = createAction(
  CONTEXT_TRIGGERED,
  (triggeredContexts = []) => ({ triggeredContexts }),
  ({ trigger, tab }) => ({ trigger, tab })
);

export const contextTriggerFailure = createAction(
  CONTEXT_TRIGGER_FAILURE,
  error => ({ error })
);

export const noticeDisplayed = createAction(
  RECO_DISPLAYED,
  notice => ({ notice }),
  trigger => ({ trigger })
);

export const noticeIgnored = createAction(
  NOTICE_IGNORED,
  notice => ({ notice, reason: Notice.ignoringReason(notice) }),
  trigger => ({ trigger })
);

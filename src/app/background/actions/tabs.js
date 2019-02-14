import {
  INIT,
  CONTEXT_TRIGGERED,
  RECO_DISPLAYED,
  RECO_DISMISSED,
  MATCH_CONTEXT,
  MATCH_CONTEXT_FAILURE,
  CONTEXT_TRIGGER_FAILURE
} from '../../constants/ActionTypes';
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

export const recoDisplayed = createAction(
  RECO_DISPLAYED,
  recommendation => ({ recommendation }),
  trigger => ({ trigger })
);
export const recoDismissed = createAction(
  RECO_DISMISSED,
  recommendation => ({ recommendation }),
  trigger => ({ trigger })
);

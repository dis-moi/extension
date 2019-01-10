import {
  INIT,
  CONTEXT_TRIGGERED,
  RECO_DISPLAYED,
  RECO_DISMISSED, MATCH_CONTEXT
} from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';

export const init = createAction(
  INIT,
  ({ onInstalledDetails, criteria, editors }) => ({ onInstalledDetails, criteria, editors }),
);

export const matchContext = createAction(
  MATCH_CONTEXT,
  context => context,
  tab => ({ tab }),
);

export const contextTriggered = createAction(
  CONTEXT_TRIGGERED,
  (triggeredContexts = []) => ({ triggeredContexts }),
  ({ trigger, tab }) => ({ trigger, tab })
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

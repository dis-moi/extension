import {
  CONTEXT_TRIGGERED,
  RECO_DISPLAYED,
  RECO_DISMISSED
} from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';

export const contextTriggered = createAction(
  CONTEXT_TRIGGERED,
  (triggeredContexts = []) => ({ triggeredContexts }),
  trigger => ({ trigger })
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

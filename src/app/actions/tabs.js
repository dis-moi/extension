import {
  CONTEXT_TRIGGERED,
  RECO_DISPLAYED,
  RECO_DISMISSED
} from '../constants/ActionTypes';

export function contextTriggered(trigger, triggeredContexts) {
  return {
    type: CONTEXT_TRIGGERED,
    trigger,
    triggeredContexts
  };
}

export function recoDisplayed(trigger, recommendation) {
  return {
    type: RECO_DISPLAYED,
    trigger,
    recommendation
  };
}

export function recoDismissed(trigger, recommendation) {
  return {
    type: RECO_DISMISSED,
    trigger,
    recommendation
  };
}

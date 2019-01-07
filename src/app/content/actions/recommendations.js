import {
  RECOMMENDATION_FOUND,
  DISMISS_RECO,
  APPROVE_RECO,
  UNAPPROVE_RECO,
  REPORT_RECO,
} from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';
import createBackgroundAction from '../createBackgroundAction';

export const recommendationFound = createAction(RECOMMENDATION_FOUND, (recommendations = []) => ({ recommendations }));
export const dismissReco = createBackgroundAction(DISMISS_RECO, id => ({ id }));
export const approveReco = createBackgroundAction(APPROVE_RECO, id => ({ id }));
export const unapproveReco = createBackgroundAction(UNAPPROVE_RECO, id => ({ id }));
export const reportReco = createBackgroundAction(REPORT_RECO, id => ({ id }));

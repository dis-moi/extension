import { ErrorAction } from '.';

export interface BadgeUpdateFailedAction extends ErrorAction {
  type: 'BADGE_UPDATE_FAILED';
}
export const badgeUpdateFailed = (e: Error): BadgeUpdateFailedAction => ({
  type: 'BADGE_UPDATE_FAILED',
  payload: e,
  error: true
});

export interface BadgeResetFailedAction extends ErrorAction {
  type: 'BADGE_RESET_FAILED';
}
export const badgeResetFailed = (e: Error): BadgeResetFailedAction => ({
  type: 'BADGE_RESET_FAILED',
  payload: e,
  error: true
});

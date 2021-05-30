import { Level } from 'libs/utils/Logger';
import { ErrorAction } from '.';

export const BADGE_UPDATE_FAILED = 'BADGE_UPDATE_FAILED';
export interface BadgeUpdateFailedAction extends ErrorAction {
  type: typeof BADGE_UPDATE_FAILED;
}
export const badgeUpdateFailed = (e: Error): BadgeUpdateFailedAction => ({
  type: BADGE_UPDATE_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.ERROR }
});

export const BADGE_RESET_FAILED = 'BADGE_RESET_FAILED';
export interface BadgeResetFailedAction extends ErrorAction {
  type: typeof BADGE_RESET_FAILED;
}
export const badgeResetFailed = (e: Error): BadgeResetFailedAction => ({
  type: BADGE_RESET_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.WARN }
});

import { Level } from '../utils/Logger';
import { ActionMeta, ActionMetaWithSeverity, ErrorAction } from './index';

export const createErrorAction = (type: unknown = 'ERROR') => (
  e: Error,
  meta: ActionMeta | ActionMetaWithSeverity
): ErrorAction => ({
  type,
  payload: e,
  error: true,
  meta: {
    ...meta,
    severity: 'severity' in meta ? meta.severity : Level.ERROR
  }
});

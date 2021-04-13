import { BaseAction } from '.';
import { RestrictedContext } from 'app/lmem/matchingContext';

export const UPDATE_RESTRICTED_CONTEXTS = 'api/UPDATE_RESTRICTED_CONTEXTS';
export interface UpdateRestrictedContextsAction extends BaseAction {
  type: typeof UPDATE_RESTRICTED_CONTEXTS;
  payload: RestrictedContext[];
}
export const updateRestrictedContexts = (
  restrictedContexts: RestrictedContext[]
): UpdateRestrictedContextsAction => ({
  type: UPDATE_RESTRICTED_CONTEXTS,
  payload: restrictedContexts
});

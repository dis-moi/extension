import { RestrictedContext } from 'app/lmem/matchingContext';
import { BaseAction } from '.';

export interface UpdateRestrictedContextsAction extends BaseAction {
  type: 'api/UPDATE_RESTRICTED_CONTEXTS';
  payload: RestrictedContext[];
}
export const updateRestrictedContexts = (
  restrictedContexts: RestrictedContext[]
): UpdateRestrictedContextsAction => ({
  type: 'api/UPDATE_RESTRICTED_CONTEXTS',
  payload: restrictedContexts
});

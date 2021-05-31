import { AppAction, UPDATE_RESTRICTED_CONTEXTS } from 'libs/store/actions';
import forbiddenTabs from 'libs/webext/forbiddenTabs';
import { RestrictedContext } from 'libs/lmem/matchingContext';

export type RestrictedContexts = RestrictedContext[];

const regexpsToRestrictedContexts = (regexps: RegExp[]) =>
  regexps.map(urlRegex => ({ urlRegex }));

const toTrueRestrictedContexts = (restrictedContexts: RestrictedContext[]) =>
  restrictedContexts.map(({ urlRegex }) => ({
    urlRegex: new RegExp(urlRegex)
  }));

export const initialState: RestrictedContexts = regexpsToRestrictedContexts(
  forbiddenTabs
);

export default (
  state: RestrictedContexts = initialState,
  action: AppAction
) => {
  switch (action.type) {
    case UPDATE_RESTRICTED_CONTEXTS: {
      return toTrueRestrictedContexts(action.payload).concat(
        regexpsToRestrictedContexts(forbiddenTabs)
      );
    }
    default:
      return state;
  }
};

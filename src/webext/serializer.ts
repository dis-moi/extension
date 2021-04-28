import { AppAction } from '../app/actions';

export const serialize = (action: AppAction): string => JSON.stringify(action);
export const deserialize = (actionAsString: string): AppAction =>
  JSON.parse(actionAsString);

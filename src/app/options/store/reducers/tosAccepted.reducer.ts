import { AppAction } from 'app/actions';

export type TosAcceptedState = boolean;

export default (
  state: TosAcceptedState = false,
  action: AppAction
): TosAcceptedState => {
  if (action.type === 'TOS_ACCEPTED') {
    return true;
  }
  return state;
};

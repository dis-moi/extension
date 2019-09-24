import { AppAction, TRANSMIT_TOS_STATUS } from 'app/actions';

export type TosAcceptedState = boolean;

export default (
  state: TosAcceptedState = false,
  action: AppAction
): TosAcceptedState => {
  switch (action.type) {
    case 'TOS_ACCEPTED':
      return true;
    case TRANSMIT_TOS_STATUS:
      return action.payload;
    default:
      return state;
  }
};

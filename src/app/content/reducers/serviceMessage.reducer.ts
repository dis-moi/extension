import { AppAction, SHOW_BULLES_UPGRADE_SERVICE_MESSAGE } from 'app/actions';

export interface ServiceMessageState {
  showUpgradeMessage: boolean;
}

const initialState: ServiceMessageState = {
  showUpgradeMessage: false
};

export default (
  state: ServiceMessageState = initialState,
  action: AppAction
): ServiceMessageState => {
  switch (action.type) {
    case SHOW_BULLES_UPGRADE_SERVICE_MESSAGE: {
      return {
        showUpgradeMessage: true
      };
    }
    case 'CLOSED': {
      return {
        showUpgradeMessage: false
      };
    }
    default:
      return state;
  }
};

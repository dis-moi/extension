import { AppAction, SHOW_BULLES_UPGRADE_SERVICE_MESSAGE } from 'app/actions';

export interface BullesUpgradeState {
  lastServiceMessageShowDate: null | Date;
}

const initialState: BullesUpgradeState = {
  lastServiceMessageShowDate: null
};

export default (
  state: BullesUpgradeState = initialState,
  action: AppAction
): BullesUpgradeState => {
  switch (action.type) {
    case SHOW_BULLES_UPGRADE_SERVICE_MESSAGE: {
      return {
        lastServiceMessageShowDate: action.payload.date
      };
    }

    default:
      return state;
  }
};

import { AppAction, SHOW_BULLES_UPDATE_SERVICE_MESSAGE } from 'app/actions';

export interface BullesUpdateState {
  lastUpdateMessageShowDate: null | Date;
}

const initialState: BullesUpdateState = {
  lastUpdateMessageShowDate: null
};

export default (
  state: BullesUpdateState = initialState,
  action: AppAction
): BullesUpdateState => {
  switch (action.type) {
    case SHOW_BULLES_UPDATE_SERVICE_MESSAGE: {
      return {
        lastUpdateMessageShowDate: action.payload.date
      };
    }

    default:
      return state;
  }
};

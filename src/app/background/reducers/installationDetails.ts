import { AppAction, INSTALLATION_DETAILS } from 'app/actions';
import { version } from '../../../../package.json';

export type InstallationDetailsState = {
  version: string;
  datetime?: Date;
  updatedAt?: Date;
  reason?: string;
};

const initialState: InstallationDetailsState = {
  version
};

export default (
  state: InstallationDetailsState = initialState,
  action: AppAction
): InstallationDetailsState => {
  switch (action.type) {
    case INSTALLATION_DETAILS:
      return action.payload.installationDetails;

    default:
      return state;
  }
};

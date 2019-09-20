import { InstallationDetails } from 'app/lmem/installation';
import { AppAction } from 'app/actions';
import { version } from '../../../../package.json';

export type InstallationDetailsState = InstallationDetails;

const initialState: InstallationDetailsState = {
  version,
  reason: 'install'
};

export default (
  state: InstallationDetailsState = initialState,
  action: AppAction
): InstallationDetailsState => {
  switch (action.type) {
    case 'INSTALLATION_DETAILS':
      return action.payload.installationDetails;

    default:
      return state;
  }
};

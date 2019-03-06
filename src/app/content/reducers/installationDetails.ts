import { INSTALLED_DETAILS } from '../../constants/ActionTypes';
import { InstallationDetails } from 'app/lmem/installation';
import { version } from '../../../../package.json';
import { AppAction } from '../../actions';

export type InstallationDetailsState = InstallationDetails;

const initialState: InstallationDetailsState = {
  version
};

export default (
  state: InstallationDetailsState = initialState,
  action: AppAction
): InstallationDetailsState => {
  switch (action.type) {
    case INSTALLED_DETAILS:
      return action.payload.installationDetails;

    default:
      return state;
  }
};

import { connectRouter, RouterRootState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import contributors, { ContributorsState } from './contributors.reducer';
import tos, { TosState } from './tos.reducer';
import installationDetails, {
  InstallationDetailsState
} from 'app/background/reducers/installationDetails';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    contributors,
    installationDetails,
    tos
  });

export interface OptionsState extends RouterRootState {
  contributors: ContributorsState;
  installationDetails: InstallationDetailsState;
  tos: TosState;
}

import { connectRouter, RouterRootState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import contributors, { ContributorsState } from './contributors.reducer';
import tosAccepted, { TosAcceptedState } from './tosAccepted.reducer';
import installationDetails, {
  InstallationDetailsState
} from 'app/background/store/reducers/installationDetails';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    contributors,
    installationDetails,
    tosAccepted
  });

export interface OptionsState extends RouterRootState {
  contributors: ContributorsState;
  installationDetails: InstallationDetailsState;
  tosAccepted: TosAcceptedState;
}

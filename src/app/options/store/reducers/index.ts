import { connectRouter, RouterRootState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import contributorsReducer, { ContributorsState } from './contributors.reducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    contributors: contributorsReducer
  });

export interface OptionsState extends RouterRootState {
  contributors: ContributorsState;
}

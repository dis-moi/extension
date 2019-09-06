import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';
import contributorsReducer, { ContributorsState } from './contributors.reducer';

export default (history: MemoryHistory) =>
  combineReducers({
    router: connectRouter(history),
    contributors: contributorsReducer
  });

export interface OptionsState {
  router: RouterState;
  contributors: ContributorsState;
}

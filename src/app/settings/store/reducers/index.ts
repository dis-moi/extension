import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';

export default (history: MemoryHistory) =>
  combineReducers({
    router: connectRouter(history)
  });

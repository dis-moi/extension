import {
  ConnectionAction,
  CONNECT,
  CONNECTED,
  DISCONNECTED
} from 'app/store/actions/connection';

export type ConnectionState = {
  connecting: number;
  connected: boolean | null;
  lastConnected: number | null;
};

export const initialState: ConnectionState = {
  connecting: 0,
  connected: null,
  lastConnected: null
};

export default function connectionReducer(
  state: ConnectionState = initialState,
  action: ConnectionAction
) {
  switch (action.type) {
    case CONNECT:
      return {
        ...state,
        connecting: state.connecting + 1
      };
    case CONNECTED:
      return {
        ...state,
        connecting: state.connecting - 1,
        connected: true,
        lastConnected: new Date()
      };
    case DISCONNECTED:
      return {
        ...state,
        connecting: state.connecting - 1,
        connected: false
      };

    default:
      return state;
  }
}

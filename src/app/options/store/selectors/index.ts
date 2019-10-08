import { TosState } from '../reducers/tos.reducer';

interface StateWithTos {
  tos: TosState;
}

export const areTosAccepted = (state: StateWithTos) => state.tos.tosAccepted;

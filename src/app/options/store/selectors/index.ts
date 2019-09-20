import { TosAcceptedState } from '../reducers/tosAccepted.reducer';

export const areTosAccepted = (state: { tosAccepted: TosAcceptedState }) =>
  state.tosAccepted;

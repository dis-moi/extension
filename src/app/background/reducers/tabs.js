import { Map as ImmutableMap } from 'immutable';
import {
  TAB_CREATED,
  TAB_UPDATED,
  TAB_REMOVED
} from '../../constants/browser/tabs';

export const initialState = new ImmutableMap();

export default function (state = initialState, action) {
  const { type, payload, meta } = action;

  switch (type) {
    case TAB_CREATED:
      return state.set(payload, meta);

    case TAB_UPDATED:
      return state.set(payload, meta);

    case TAB_REMOVED:
      return state.remove(payload);

    default:
      return state;
  }
}

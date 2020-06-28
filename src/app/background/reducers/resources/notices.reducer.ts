import * as R from 'ramda';
import { AppAction, NOTICES_FETCHED } from 'app/actions';
import { Notice } from 'app/lmem/notice';

export type Notices = Notice[];

export const initialState: Notices = [];

export default (state: Notices = initialState, action: AppAction) => {
  switch (action.type) {
    case NOTICES_FETCHED:
      return R.uniqWith(R.eqProps('id'), R.concat(state, action.payload));

    default:
      return state;
  }
};

import * as R from 'ramda';
import { AppAction, NOTICES_FETCHED } from 'app/actions';
import { NoticeWithContributor } from 'app/lmem/notice';

type NoticesWithContributor = NoticeWithContributor[];

export const initialState: NoticesWithContributor = [];

export default (
  state: NoticesWithContributor = initialState,
  action: AppAction
) => {
  switch (action.type) {
    case NOTICES_FETCHED:
      return R.uniqWith(R.eqProps('id'), R.concat(state, action.payload));

    default:
      return state;
  }
};

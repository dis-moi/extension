import {
  APPROVE_RECO, DISMISS_RECO, RECOMMENDATION_FOUND, UNAPPROVE_RECO
} from '../../constants/ActionTypes';
import updateItem from '../../utils/updateItem';
import toggleTernary from '../../utils/toggleTernary';
import { getById } from '../selectors/notices';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case RECOMMENDATION_FOUND: {
      const { recommendations } = payload;

      return recommendations;
    }

    case DISMISS_RECO:
      return updateItem(state, { id: payload.id, isDismissed: true });

    case UNAPPROVE_RECO: {
      const item = getById(state, payload);

      return updateItem(state, { id: payload.id, isApproved: toggleTernary(item.isApproved, true) });
    }

    case APPROVE_RECO: {
      const item = getById(state, payload);

      return updateItem(state, { ...item, isApproved: toggleTernary(item.isApproved) });
    }

    default:
      return state;
  }
};
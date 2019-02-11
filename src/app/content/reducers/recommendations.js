import {
  NOTICES_FOUND, DISMISS_NOTICE, UNDISMISS_NOTICE, LIKE_NOTICE, UNLIKE_NOTICE, DISLIKE_NOTICE, UNDISLIKE_NOTICE
} from '../../constants/ActionTypes';
import updateItem from '../../utils/updateItem';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTICES_FOUND:
      return payload.notices;

    case DISMISS_NOTICE:
      return updateItem(state, { id: payload.id, dismissed: true });

    case UNDISMISS_NOTICE:
      return updateItem(state, { id: payload.id, dismissed: false });

    case LIKE_NOTICE:
      return updateItem(state, { id: payload.id, liked: true,  });

    case UNLIKE_NOTICE:
      return updateItem(state, { id: payload.id, liked: false });

    case DISLIKE_NOTICE:
      return updateItem(state, { id: payload.id, disliked: true,  });

    case UNDISLIKE_NOTICE:
      return updateItem(state, { id: payload.id, disliked: false });

    default:
      return state;
  }
};

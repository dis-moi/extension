import { combineReducers } from 'redux';
import {
  fetched,
  FetchedState,
  fetching,
  FetchingState,
  lastFetched,
  LastFetchedState
} from 'app/store/collection/reducers';
import { Categories } from 'app/lmem/category';
import actionTypes, {
  FETCH_CATEGORIES_SUCCESS,
  FetchCategoriesSuccessAction
} from 'app/actions/categories';

export interface CategoriesCollection {
  fetched: FetchedState;
  fetching: FetchingState;
  items: Categories;
  lastFetched: LastFetchedState;
}

const items = (
  state: Categories = {},
  action: FetchCategoriesSuccessAction
) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  fetched: fetched(...actionTypes),
  fetching: fetching(...actionTypes),
  items,
  lastFetched: lastFetched(...actionTypes)
});

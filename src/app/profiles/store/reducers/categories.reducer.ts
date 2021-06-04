import { combineReducers } from 'redux';
import {
  fetched,
  FetchedState,
  fetching,
  FetchingState,
  lastFetched,
  LastFetchedState
} from 'libs/store/collection/reducers';
import { Categories } from 'libs/domain/category';
import actionTypes, {
  FETCH_CATEGORIES_SUCCESS,
  FetchCategoriesSuccessAction
} from 'libs/store/actions/categories';

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

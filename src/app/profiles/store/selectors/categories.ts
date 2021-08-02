import { createSelector } from 'reselect';
import { isCollectionLoading } from 'libs/store/collection/selectors';
import { ProfilesState } from '../reducers';

export const getCategoriesCollection = (state: ProfilesState) =>
  state.categories;

export const getCategories = createSelector(
  [getCategoriesCollection],
  categoriesCollection => categoriesCollection.items
);

export const areCategoriesLoading = createSelector(
  [getCategoriesCollection],
  categoriesCollection => isCollectionLoading(categoriesCollection)
);

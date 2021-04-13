import { createSelector } from 'reselect';
import { isCollectionLoading } from 'app/store/collection/selectors';
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

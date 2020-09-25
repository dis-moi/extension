import { createSelector } from 'reselect';
import { ProfilesState } from '../reducers';
import { isCollectionLoading } from 'app/store/collection/selectors';

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

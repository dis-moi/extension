import { Categories } from 'app/lmem/category';
import { createErrorAction } from './helpers';

export const FETCH_CATEGORIES_REQUEST = 'CATEGORIES/FETCH_REQUEST';
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST
});
export type FetchCategoriesRequestAction = ReturnType<
  typeof fetchCategoriesRequest
>;

export const FETCH_CATEGORIES_SUCCESS = 'CATEGORIES/FETCH_SUCCESS';
export const fetchCategoriesSuccess = (categories: Categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories
});
export type FetchCategoriesSuccessAction = ReturnType<
  typeof fetchCategoriesSuccess
>;

export const FETCH_CATEGORIES_FAILURE = 'CATEGORIES/FETCH_FAILURE';
export const fetchCategoriesFailure = createErrorAction(
  FETCH_CATEGORIES_FAILURE
);
export type FetchCategoriesFailureAction = ReturnType<
  typeof fetchCategoriesFailure
>;

const types: [string, string, string] = [
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
];

export default types;

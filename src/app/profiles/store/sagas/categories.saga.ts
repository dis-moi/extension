import { put, call, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CATEGORIES_REQUEST,
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess
} from 'libs/store/actions/categories';
import fetchCategories from 'libs/api/fetchCategories';

function* fetchCategoriesSaga() {
  try {
    const categories = yield call(fetchCategories);
    yield put(fetchCategoriesSuccess(categories));
  } catch (e) {
    yield put(fetchCategoriesFailure(e));
  }
}

export default function* categoriesSaga() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
  yield put(fetchCategoriesRequest());
}

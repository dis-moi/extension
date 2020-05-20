// import {createMatchSelector} from "connected-react-router";
// import {put, select} from "redux-saga/effects";
// import {fetchContributorRequest} from "../actions/contributor";
// import {fetchContributorNotices} from "../profiles/store/actions/notices";
// import {refreshContributors} from "../actions";
// import {matchPath} from "react-router";
//
// function* matchSelectorSaga(path: string) {
//     const matchSelector = matchPath('/les-contributeurs/:id');
//     const match = yield select(matchSelector);
//     if (match) {
//
//     }
// }
//
// function* matchSelectorSaga() {
//     const matchSelector = createMatchSelector('/les-contributeurs/:id');
//     const match = yield select(matchSelector);
//     if (match) {
//         yield put(fetchContributorRequest(Number(match.params.id)));
//         yield put(fetchContributorNotices(Number(match.params.id)));
//         yield put(refreshContributors());
//     }
// }
//
//

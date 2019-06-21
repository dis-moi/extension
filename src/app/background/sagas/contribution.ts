import { takeLatest, call } from 'redux-saga/effects';
import sendEmail from 'api/sendInBlue/sendEmail';
import { ContributionSubmittedAction } from '../../actions/contribution';
import createContributionEmail from '../services/createContributionEmail';

export function* sendContributionSaga({
  payload: contribution
}: ContributionSubmittedAction) {
  yield call(sendEmail, createContributionEmail(contribution));
}

export default function* contributionSaga() {
  yield takeLatest('CONTRIBUTION_SUBMITTED', sendContributionSaga);
}

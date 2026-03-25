import { call, take, takeLatest } from 'redux-saga/effects';
import { REFRESH_CONTRIBUTORS } from 'libs/store/actions';
import refreshContributorsSaga from 'libs/store/sagas/refreshContributors.saga';
import createAlarmChannel from 'libs/webext/alarmChannel';

const ALARM_NAME = 'refresh-contributors';
const intervalMinutes = Number(process.env.REFRESH_CONTRIBUTORS_INTERVAL);

function* refreshContributorsPeriodically() {
  yield call(refreshContributorsSaga);

  if (intervalMinutes > 0) {
    browser.alarms.create(ALARM_NAME, { periodInMinutes: intervalMinutes });
    const channel = createAlarmChannel(ALARM_NAME);
    while (true) {
      yield take(channel);
      yield call(refreshContributorsSaga);
    }
  }
}

export default function*() {
  yield takeLatest(REFRESH_CONTRIBUTORS, refreshContributorsSaga);
  yield call(refreshContributorsPeriodically);
}

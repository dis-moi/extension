import { eventChannel } from 'redux-saga';

export default function createAlarmChannel(alarmName: string) {
  return eventChannel((emit) => {
    const handler = (alarm: browser.alarms.Alarm) => {
      if (alarm.name === alarmName) {
        emit(alarm);
      }
    };
    browser.alarms.onAlarm.addListener(handler);
    return () => browser.alarms.onAlarm.removeListener(handler);
  });
}

import { CANCEL } from '@redux-saga/symbols';
import { call } from 'redux-saga/effects';
import Logger from 'libs/utils/Logger';
import uniqId from "../../../utils/uniqId";

const createAlarmResolver = (alarmName: string) => <T>(
  resolve: (value?: T | PromiseLike<T>) => void,
  val?: T
) => (alarm: browser.alarms.Alarm) => {
  Logger.debug(`Alarm ${alarmName} has been triggered.`);

  if (alarm.name === alarmName) {
    resolve(val);
    Logger.debug(`Alarm ${alarmName} has been resolved.`);
  }
};

function delayP<T = true>(ms = 1000, val: T): Promise<T> {
  if (ms < 1000) {
    // see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms/create#parameters
    throw new Error("Period can't be inferior to 1 minute.");
  }

  const alarmName = `delayP_${uniqId()}`;
  const periodInMinutes = ms / 1000 / 60;
  const promise = new Promise<T>(resolve => {
    Logger.debug(`Creating an alarm named ${alarmName} with a period of ${periodInMinutes} minute(s).`)
    browser.alarms.create(alarmName, {
      periodInMinutes
    });

    browser.alarms.onAlarm.addListener(
      createAlarmResolver(alarmName)<T>(resolve, val)
    );
  });

  // see https://github.com/redux-saga/redux-saga/blob/v1.1.3/packages/delay-p/src/index.js
  // @ts-ignore
  promise[CANCEL] = () => {
    browser.alarms.clear(alarmName);
  };

  return promise;
}

export const delay = call.bind(null, delayP);

export default delay;

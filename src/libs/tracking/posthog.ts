/* eslint-disable camelcase */
import { getBrowserInfo, getDevice, getDeviceType } from './utils';

export const getInitialProperties = async () => {
  const { name, version } = await getBrowserInfo();
  const { os } = await browser.runtime.getPlatformInfo();

  return {
    $initial_browser: name,
    $browser: name,
    $initial_browser_version: version,
    $browser_version: version,
    $os: os,
    $device: getDevice(navigator.userAgent),
    $device_type: getDeviceType(navigator.userAgent)
  };
};

export const getProperties = async () => {
  const {
    $initial_browser,
    $initial_browser_version,
    ...platformProperties
  } = await getInitialProperties();

  return platformProperties;
};

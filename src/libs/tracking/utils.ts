// @see https://raw.githubusercontent.com/PostHog/posthog-js/master/src/utils.js
type BrowserInfo = browser.runtime.BrowserInfo;

type Browser =
  | 'Opera Mini'
  | 'Opera'
  | 'BlackBerry'
  | 'Internet Explorer Mobile'
  | 'Samsung Internet'
  | 'Microsoft Edge'
  | 'Facebook Mobile'
  | 'Chrome'
  | 'Chrome iOS'
  | 'UC Browser'
  | 'Firefox iOS'
  | 'Mobile Safari'
  | 'Safari'
  | 'Android Mobile'
  | 'Konqueror'
  | 'Firefox'
  | 'Internet Explorer'
  | 'Mozilla'
  | '';

/**
 * This function detects which browser is running this script.
 * The order of the checks are important since many user agents
 * include key words used in later checks.
 */
const getBrowser = (userAgent: string, vendor: string): Browser => {
  vendor = vendor || ''; // vendor is undefined for at least IE9
  if (userAgent.includes(' OPR/')) {
    if (userAgent.includes('Mini')) {
      return 'Opera Mini';
    }
    return 'Opera';
  } else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
    return 'BlackBerry';
  } else if (
    userAgent.includes('IEMobile') ||
    userAgent.includes('WPDesktop')
  ) {
    return 'Internet Explorer Mobile';
  } else if (userAgent.includes('SamsungBrowser/')) {
    // https://developer.samsung.com/internet/user-agent-string-format
    return 'Samsung Internet';
  } else if (userAgent.includes('Edge') || userAgent.includes('Edg/')) {
    return 'Microsoft Edge';
  } else if (userAgent.includes('FBIOS')) {
    return 'Facebook Mobile';
  } else if (userAgent.includes('Chrome')) {
    return 'Chrome';
  } else if (userAgent.includes('CriOS')) {
    return 'Chrome iOS';
  } else if (userAgent.includes('UCWEB') || userAgent.includes('UCBrowser')) {
    return 'UC Browser';
  } else if (userAgent.includes('FxiOS')) {
    return 'Firefox iOS';
  } else if (vendor.includes('Apple')) {
    if (userAgent.includes('Mobile')) {
      return 'Mobile Safari';
    }
    return 'Safari';
  } else if (userAgent.includes('Android')) {
    return 'Android Mobile';
  } else if (userAgent.includes('Konqueror')) {
    return 'Konqueror';
  } else if (userAgent.includes('Firefox')) {
    return 'Firefox';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
    return 'Internet Explorer';
  } else if (userAgent.includes('Gecko')) {
    return 'Mozilla';
  } else {
    return '';
  }
};

/**
 * This function detects which browser version is running this script,
 * parsing major and minor version (e.g., 42.1). User agent strings from:
 * http://www.useragentstring.com/pages/useragentstring.php
 */
const getBrowserVersion = (userAgent: string, vendor: string) => {
  const browser = getBrowser(userAgent, vendor);

  const versionRegexs: { [key in Browser]: RegExp } = {
    'Opera Mini': /(Opera|OPR)\/(\d+(\.\d+)?)/,
    'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
    'Microsoft Edge': /Edge?\/(\d+(\.\d+)?)/,
    'Facebook Mobile': /FBIOS?\/(\d+(\.\d+)?)/,
    Chrome: /Chrome\/(\d+(\.\d+)?)/,
    'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
    'UC Browser': /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
    Safari: /Version\/(\d+(\.\d+)?)/,
    'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
    Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
    Firefox: /Firefox\/(\d+(\.\d+)?)/,
    'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
    Konqueror: /Konqueror:(\d+(\.\d+)?)/,
    BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
    'Android Mobile': /android\s(\d+(\.\d+)?)/,
    'Samsung Internet': /SamsungBrowser\/(\d+(\.\d+)?)/,
    'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
    Mozilla: /rv:(\d+(\.\d+)?)/,
    '': /\w+:(\d+(\.\d+)?)/
  };
  const regex = versionRegexs[browser];
  if (regex === undefined) {
    return null;
  }
  const matches = userAgent.match(regex);
  if (!matches) {
    return null;
  }
  return matches[matches.length - 2];
};

export const getDevice = (userAgent: string) => {
  if (/Windows Phone/i.test(userAgent) || /WPDesktop/.test(userAgent)) {
    return 'Windows Phone';
  } else if (/iPad/.test(userAgent)) {
    return 'iPad';
  } else if (/iPod/.test(userAgent)) {
    return 'iPod Touch';
  } else if (/iPhone/.test(userAgent)) {
    return 'iPhone';
  } else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
    return 'BlackBerry';
  } else if (/Android/.test(userAgent) && !/Mobile/.test(userAgent)) {
    return 'Android Tablet';
  } else if (/Android/.test(userAgent)) {
    return 'Android';
  } else {
    return '';
  }
};

export const getDeviceType = (userAgent: string) => {
  const device = getDevice(userAgent);
  if (device === 'iPad' || device === 'Android Tablet') {
    return 'Tablet';
  } else if (device) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
};

export const getBrowserInfo = async (): Promise<BrowserInfo> => {
  if (browser.runtime.getBrowserInfo) {
    return browser.runtime.getBrowserInfo();
  }

  return Promise.resolve({
    /** The name of the browser, for example 'Firefox'. */
    name: getBrowser(navigator.userAgent, navigator.vendor),
    /** The name of the browser vendor, for example 'Mozilla'. */
    vendor: navigator.vendor,
    version: getBrowserVersion(navigator.userAgent, navigator.vendor) || '',
    buildID: ''
  });
};

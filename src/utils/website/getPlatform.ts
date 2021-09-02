export type Platform =
  | 'unknown'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux'
  | string;

export const platformList: Platform[] = [
  'macos',
  'ios',
  'windows',
  'android',
  'linux'
];

export const getPlatform = (window: Window): Platform => {
  const navPlatform = window.navigator.platform;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let platform = 'unknown';
  if (macosPlatforms.indexOf(navPlatform) !== -1) {
    platform = 'macos';
  } else if (iosPlatforms.indexOf(navPlatform) !== -1) {
    platform = 'ios';
  } else if (windowsPlatforms.indexOf(navPlatform) !== -1) {
    platform = 'windows';
  } else if (/Android/.test(navPlatform)) {
    platform = 'android';
  } else if (!platform && /Linux/.test(navPlatform)) {
    platform = 'linux';
  }
  return platform;
};

export type Browser =
  | 'firefox'
  | 'chrome'
  | 'safari'
  | 'edge'
  | 'brave'
  | string;

export const browserList: Browser[] = [
  'firefox',
  'chrome',
  'safari',
  'edge',
  'brave'
];

export const getBrowser: Browser = (() => {
  const ua = navigator.userAgent;
  let tem;
  let M =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null)
      return tem
        .slice(1)
        .join(' ')
        .replace('OPR', 'Opera');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  // return M.join(' ');
  return M[0].toLowerCase(); // without version
})();

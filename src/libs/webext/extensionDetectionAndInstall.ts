import bowser from 'bowser';

const getUserAgent = () => {
  const userAgent = bowser.getParser(window.navigator.userAgent);

  const isChrome = userAgent.satisfies({ chrome: '>20' });
  const isFirefox = userAgent.satisfies({ firefox: '>31' });
  const isOpera = userAgent.satisfies({ opera: '>31' });

  return { isChrome, isFirefox, isOpera } as const;
};

const checkVersion = async (extensionId: string): Promise<string | null> => {
  const response = await browser.runtime.sendMessage(extensionId, 'version');
  if (response && 'version' in response) return response.version as string;
  return null;
};

const testExtension = async (): Promise<string | null> => {
  const { isChrome, isFirefox } = getUserAgent();
  if (isChrome && chrome && process.env.CHROME_EXTENSION_ID) {
    return checkVersion(process.env.CHROME_EXTENSION_ID);
  } else if (isFirefox && process.env.FIREFOX_EXTENSION_ID) {
    return checkVersion(process.env.FIREFOX_EXTENSION_ID);
  }
  return null;
};

const openRequestedPopup = () => {
  const { isChrome, isFirefox, isOpera } = getUserAgent();
  const windowsHeight = document.body.clientHeight;
  const windowsWidth = window.innerWidth / 2 - 20;
  const popUpURL =
    isChrome || isOpera
      ? process.env.CHROME_STORE_URL
      : process.env.FIREFOX_STORE_URL;

  const offset = window.innerWidth > 1200 ? 780 : 480;
  const windowsLeft = window.screenX + window.innerWidth / 2 - offset;

  const strWindowFeatures = isFirefox
    ? `width=480,height=${windowsHeight},left=${windowsLeft},resizable=yes,scrollbars=yes,status=1`
    : `width=${windowsWidth},height=${windowsHeight},resizable=yes,scrollbars=yes,status=1`;

  const openedWindow = window.open(popUpURL, 'Bulle', strWindowFeatures);
  openedWindow?.focus();
};

export const installExtension = async () => {
  const { isChrome, isFirefox, isOpera } = getUserAgent();
  const installedVersion = await testExtension();

  if (!installedVersion) {
    if (isChrome || isFirefox) {
      openRequestedPopup();
    } else if (isOpera) {
      window.location.href = 'https://www.dismoi.io/opera';
    } else {
      window.location.href = 'https://www.dismoi.io/navigateur-non-supporte/';
    }
  }
};

import bowser from 'bowser';

const NO_BROWSER = { isChrome: false, isFirefox: false, isOpera: false };

/**
 * Hors navigateur — pendant un rendu serveur — aucune de ces réponses n'est
 * vraie, et il n'y a personne à qui proposer une installation.
 */
export const getUserAgent = (source?: string) => {
  const agent =
    source ??
    (typeof navigator === 'undefined' ? undefined : navigator.userAgent);

  if (!agent) {
    return NO_BROWSER;
  }

  const userAgent = bowser.getParser(agent);

  return {
    isChrome: Boolean(userAgent.satisfies({ chrome: '>20' })),
    isFirefox: Boolean(userAgent.satisfies({ firefox: '>31' })),
    isOpera: Boolean(userAgent.satisfies({ opera: '>31' })),
  } as const;
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

  const openedWindow = window.open(popUpURL, 'DisMoi', strWindowFeatures);
  openedWindow?.focus();
};

export const installExtension = async () => {
  const { isChrome, isFirefox, isOpera } = getUserAgent();

  if (isChrome || isFirefox) {
    openRequestedPopup();
  } else if (isOpera) {
    window.location.href = 'https://www.dismoi.io/opera';
  } else {
    window.location.href = 'https://www.dismoi.io/navigateur-non-supporte/';
  }
};

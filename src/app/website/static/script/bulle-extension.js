const bull_config = {
  bulle_non_supporte: 'https://www.dismoi.io/navigateur-non-supporte/',
  bulle_deja_installe: '',
  bulle_lien_opera: 'https://www.dismoi.io/opera/',
  bulle_lien_extension_chrome:
    'https://chrome.google.com/webstore/detail/bulles/fpjlnlnbacohacebkadbbjebbipcknbg',
  bulle_lien_extension_firefox:
    'https://addons.mozilla.org/en-US/firefox/addon/dismoi/',
  bulle_extension_id_chrome: 'fpjlnlnbacohacebkadbbjebbipcknbg'
};

const LINK_UNAVAILABLE = window.bull_config.bulle_non_supporte;
const LINK_POPUP_EXTENSION_CHROME =
  window.bull_config.bulle_lien_extension_chrome;
const LINK_POPUP_EXTENSION_FF = window.bull_config.bulle_lien_extension_firefox;
const EXTENSION_ID = window.bull_config.bulle_extension_id_chrome;
const LINK_DEJA_INSTALLE = window.bull_config.bulle_deja_installe;
const LINK_OPERA = window.bull_config.bulle_lien_opera;

const el = {
  windowObjectReference: null,
  browser: null,
  isChrome: null,
  isFirefox: null,
  isOpera: null,
  timer: null,
  dejaInstalle: false
};

const closeWin = () => {
  el.windowObjectReference.close();
};

/*Function open Overlay*/
const openOverlay = () => {
  $('.overlay')
    .delay(80)
    .fadeIn(100);
};

/*Functions close Overlay*/
const closeOverlay = () => {
  $('.overlay')
    .delay(80)
    .fadeOut(100);
};

/*Function open PopUp*/
const openRequestedPopup = e => {
  const windowsHeight = $(document).height();
  const windowsWidth = $(window).width() / 2 - 20;
  const popUpURL =
    el.isChrome || el.isOpera
      ? LINK_POPUP_EXTENSION_CHROME
      : LINK_POPUP_EXTENSION_FF;
  let strWindowFeatures =
    'width=' +
    windowsWidth +
    ',height=' +
    windowsHeight +
    ',resizable=yes,scrollbars=yes,status=1';
  if (el.isFirefox) {
    let offset = 480;
    if ($(window).width() > 1200) {
      offset = 780;
    }
    const windowsLeft = window.screenX + $(window).width() / 2 - offset;
    if ($(window).width() > 1200) {
      $('body').addClass('bulles-installer-wide');
    } else {
      $('body').removeClass('bulles-installer-wide');
    }
    strWindowFeatures =
      'width=480,height=' +
      windowsHeight +
      ',left=' +
      windowsLeft +
      ',resizable=yes,scrollbars=yes,status=1';
  }

  el.windowObjectReference = window.open(popUpURL, 'Bulle', strWindowFeatures);
  el.windowObjectReference.focus();
  openOverlay();

  /*Detect if Pop-Up close*/
  el.timer = setInterval(() => {
    if (el.windowObjectReference.closed) {
      clearInterval(el.timer);
      closeOverlay();
    }
  }, 500);
};

const clickInstallHandler = e => {
  if (el.dejaInstalle && LINK_DEJA_INSTALLE) {
    window.location.href = LINK_DEJA_INSTALLE;
  } else {
    if (el.isChrome || el.isFirefox) {
      openRequestedPopup();
    } else if (el.isOpera && LINK_OPERA) {
      window.location.href = LINK_OPERA;
    } else {
      if (LINK_UNAVAILABLE) {
        window.location.href = LINK_UNAVAILABLE;
      }
    }
  }
  e.preventDefault();
};

const testExtension = () => {
  if (!el.isChrome || !chrome) {
    return;
  }
  chrome.runtime.sendMessage(EXTENSION_ID, 'version', response => {
    if (!response) {
      console.info('No extension');
      return;
    }
    console.info('Extension version: ', response.version);
    // https://www.twilio.com/blog/2018/03/detect-chrome-extension-installed.html
    el.dejaInstalle = true;
  });
};

const setUp = () => {
  el.browser = bowser.getParser(window.navigator.userAgent);
  el.isChrome = el.browser.satisfies({ chrome: '>20' });
  el.isFirefox = el.browser.satisfies({ firefox: '>31' });
  el.isOpera = el.browser.satisfies({ opera: '>31' });

  console.info('Browser detection: ', el);
};

const start = () => {
  $('.bulle-installer').on('click', clickInstallHandler);

  $('#restartInstallButton').on('click', clickInstallHandler);

  $('.overlay').on('click', ev => {
    if (ev.target.id !== 'restartInstallButton') {
      if (ev.target.id !== 'h-icon') {
        closeOverlay();
      }
    }
  });

  $('#notNowButton').on('click', () => {
    if (el.isFirefox) {
      closeWin();
    }
  });

  if ($('.bulle-installer').length) {
    testExtension();
  }
};

const initExtensionInstaller = () => {
  setUp();
  start();

  console.info('Scripts for installing bulle extension');
};

window.addEventListener('load', () => {
  console.info('Bulle JS is ready');
  initExtensionInstaller();
});

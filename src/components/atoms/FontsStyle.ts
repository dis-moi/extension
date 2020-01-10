import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* lato-100normal - latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-display: swap;
    font-weight: 100;
    src:
      local('Lato Thin '),
      local('Lato-Thin'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-100.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-100.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-100italic - latin */
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-display: swap;
    font-weight: 100;
    src:
      local('Lato Thin italic'),
      local('Lato-Thinitalic'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-100italic.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-100italic.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-300normal - latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src:
      local('Lato Light '),
      local('Lato-Light'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-300.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-300italic - latin */
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-display: swap;
    font-weight: 300;
    src:
      local('Lato Light italic'),
      local('Lato-Lightitalic'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-300italic.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-300italic.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-400normal - latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src:
      local('Lato Regular '),
      local('Lato-Regular'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-400.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-400.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-400italic - latin */
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-display: swap;
    font-weight: 400;
    src:
      local('Lato Regular italic'),
      local('Lato-Regularitalic'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-400italic.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-400italic.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-700normal - latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src:
      local('Lato Bold '),
      local('Lato-Bold'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-700.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-700italic - latin */
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-display: swap;
    font-weight: 700;
    src:
      local('Lato Bold italic'),
      local('Lato-Bolditalic'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-700italic.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-700italic.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-900normal - latin */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-display: swap;
    font-weight: 900;
    src:
      local('Lato Black '),
      local('Lato-Black'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-900.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-900.woff') format('woff'); /* Modern Browsers */
  }
  
  /* lato-900italic - latin */
  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-display: swap;
    font-weight: 900;
    src:
      local('Lato Black italic'),
      local('Lato-Blackitalic'),
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-900italic.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/lato-latin-900italic.woff') format('woff'); /* Modern Browsers */
  }
  
  /* sedgwick-ave-400normal - latin */
  @font-face {
    font-family: 'Sedgwick Ave';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src:
      local('Sedgwick Ave Regular '),
      local('Sedgwick Ave-Regular'),
      url('chrome-extension://${chrome.runtime.id}/fonts/sedgwick-ave-latin-400.woff2') format('woff2'), /* Super Modern Browsers */
      url('chrome-extension://${chrome.runtime.id}/fonts/sedgwick-ave-latin-400.woff') format('woff'); /* Modern Browsers */
  }
`;

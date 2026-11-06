import { getUserAgent } from 'libs/webext/extensionDetectionAndInstall';

/**
 * Vrai lorsque la page s'affiche dans Chrome.
 *
 * C'était auparavant une constante, calculée au chargement du module à
 * partir de `window.browser` : la variable de Firefox, que Chrome ne déclare
 * pas et qu'un rendu serveur n'a pas davantage. Le test était donc à la fois
 * fatal là où il échouait et inversé là où il aboutissait.
 */
const isChrome = (userAgent?: string): boolean =>
  getUserAgent(userAgent).isChrome;

export default isChrome;

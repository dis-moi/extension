/**
 * Accès à l'API WebExtension depuis une page ordinaire.
 *
 * Lire `browser` directement lève une `ReferenceError` partout où la variable
 * n'est pas déclarée — c'est-à-dire dans Chrome, et sur le serveur. Et `?.`
 * n'y change rien : l'opérateur protège d'une valeur nulle, pas d'un
 * identifiant inexistant. On passe donc toujours par une portée explicite.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExtensionApi {
  runtime?: {
    connect?: (...args: any[]) => any;
    [key: string]: any;
  };
  [key: string]: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface ScopeWithExtensionApi {
  browser?: ExtensionApi;
  chrome?: ExtensionApi;
}

export const currentScope = (): ScopeWithExtensionApi =>
  globalThis as ScopeWithExtensionApi;

export const webExtensionApi = (
  scope: ScopeWithExtensionApi = currentScope(),
): ExtensionApi | null => scope.browser ?? scope.chrome ?? null;

/**
 * Vrai lorsque la page peut ouvrir un canal vers l'extension.
 *
 * Chrome expose un objet `chrome` à toute page ; seules celles que le
 * manifeste déclare dans `externally_connectable` y trouvent
 * `runtime.connect`. C'est donc cette méthode, et non la simple présence de
 * l'API, qui distingue les deux cas.
 */
export const canConnectToExtension = (
  scope: ScopeWithExtensionApi = currentScope(),
): boolean => typeof webExtensionApi(scope)?.runtime?.connect === 'function';

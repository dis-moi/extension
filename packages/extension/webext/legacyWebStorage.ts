// eslint-disable-next-line
// @ts-ignore pas de typage publié pour ce chemin interne
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { WebStorage } from 'redux-persist/es/types';

interface ScopeWithStorage {
  localStorage?: unknown;
}

/**
 * Le stockage web dans lequel les anciennes versions conservaient leur état.
 *
 * Il n'existe que dans une page d'arrière-plan, c'est-à-dire sous Manifest V2
 * — donc aujourd'hui sous Firefox seulement. Le service worker de Manifest V3
 * n'a pas de `localStorage`, et `redux-persist/lib/storage` en réclame un dès
 * qu'on importe le module : il écrit alors une erreur dans la console avant
 * même qu'on lui ait demandé quoi que ce soit. On passe donc par la fabrique,
 * appelée seulement là où elle peut aboutir.
 */
const legacyWebStorage = (scope: ScopeWithStorage): WebStorage | null =>
  'localStorage' in scope ? createWebStorage('local') : null;

export default legacyWebStorage;

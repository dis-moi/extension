import { defaultLng, SupportedLanguage } from '@dismoi/i18n/language';

export type LocaleState = SupportedLanguage;

/**
 * La langue de la page, dans l'état plutôt que dans i18next.
 *
 * Le tri des contributeurs et des messages met en tête ceux de la langue
 * courante. Le lire sur l'instance globale d'i18next donnait une réponse
 * différente sur le serveur — qui n'a pas de langue détectée — et dans le
 * navigateur : deux ordres, donc deux rendus, et une hydratation en échec.
 * La langue vient maintenant du chemin de l'URL, que les deux côtés
 * connaissent.
 */
const locale = (state: LocaleState = defaultLng): LocaleState => state;

export default locale;

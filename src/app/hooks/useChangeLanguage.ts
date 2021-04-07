import i18n, { SupportedLanguage } from '../../i18n';

const fr = 'fr';
const en = 'en';

export default (): SupportedLanguage => {
  const browserLanguage = i18n.language;

  const pathLanguage = window.location.pathname.search(en) === 1 ? en : fr;

  if (pathLanguage === browserLanguage) return pathLanguage;
  if (pathLanguage === en && browserLanguage !== pathLanguage) {
    i18n.changeLanguage(en);
    return en;
  }
  if (pathLanguage !== en && browserLanguage !== fr) {
    i18n.changeLanguage(fr);
    return fr;
  }
  return fr;
};

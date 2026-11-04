import slugify from 'slugify';
import i18n from 'i18next';
import join from 'join-url';
import { Contributor } from '@dismoi/domain/contributor';

const pathToContributor = (contributor: Contributor) => {
  // `path.profiles.contributors` porte déjà la langue (« /fr/profils »,
  // « /en/guides ») et correspond aux pages servies par le site.
  return join.pathname(
    i18n.t('path.profiles.contributors'),
    contributor.id,
    slugify(contributor.name),
  );
};

export default pathToContributor;

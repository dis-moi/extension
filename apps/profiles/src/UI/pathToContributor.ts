import slugify from 'slugify';
import { Contributor } from 'libs/lmem/contributor';
import i18n from 'i18next';

const pathToContributor = (contributor: Contributor) => {
  return `${i18n.t('path.profiles.contributors')}/${contributor.id}/${slugify(
    contributor.name
  )}`;
};

export default pathToContributor;

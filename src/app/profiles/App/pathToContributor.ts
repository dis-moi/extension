import slugify from 'slugify';
import i18n from 'i18next';
import { Contributor } from 'libs/domain/contributor';

const pathToContributor = (contributor: Contributor) => {
  return `${i18n.t('path.profiles.contributors')}/${contributor.id}/${slugify(
    contributor.name
  )}`;
};

export default pathToContributor;

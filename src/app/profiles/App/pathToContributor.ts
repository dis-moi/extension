import slugify from 'slugify';
import i18n from 'i18next';
import { Contributor } from 'libs/domain/contributor';
import { getPathPrefix } from '../../../libs/facets/getPathPrefix';

const pathToContributor = (contributor: Contributor) => {
  return `${getPathPrefix(i18n)}${i18n.t('path.profiles.contributors')}/${
    contributor.id
  }/${slugify(contributor.name)}`;
};

export default pathToContributor;

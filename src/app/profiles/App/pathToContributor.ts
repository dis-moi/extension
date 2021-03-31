import slugify from 'slugify';
import { Contributor } from 'app/lmem/contributor';
import { path } from '../../../routes';
import useChangeLanguage from '../../hooks/useChangeLanguage';

const pathToContributor = (contributor: Contributor) => {
  const lang = useChangeLanguage();
  return `${path[lang].CONTRIBUTORS}/${contributor.id}/${slugify(
    contributor.name
  )}`;
};

export default pathToContributor;

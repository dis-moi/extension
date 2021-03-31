import slugify from 'slugify';
import { Contributor } from 'app/lmem/contributor';
import { path } from '../../routes';

const pathToContributor = (contributor: Contributor) =>
  `${path.fr.CONTRIBUTORS}/${contributor.id}/${slugify(contributor.name)}`;

export default pathToContributor;

import slugify from 'slugify';
import { Contributor } from 'app/lmem/contributor';
import { CONTRIBUTORS_PATH } from '../routes';

const pathToContributor = (contributor: Contributor) =>
  `${CONTRIBUTORS_PATH}/${contributor.id}/${slugify(contributor.name)}`;

export default pathToContributor;

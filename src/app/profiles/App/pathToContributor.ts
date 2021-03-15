import slugify from 'slugify';
import { Contributor } from 'app/lmem/contributor';
import { SOURCES } from '../routes';

const pathToContributor = (contributor: Contributor) =>
  `${SOURCES}/${contributor.id}/${slugify(contributor.name)}`;

export default pathToContributor;

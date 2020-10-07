import slugify from 'slugify';
import { Contributor } from 'app/lmem/contributor';

const pathToContributor = (contributor: Contributor) =>
  `/sources/${contributor.id}/${slugify(contributor.name)}`;

export default pathToContributor;

import slugify from 'slugify';
import { Contributor } from 'app/lmem/contributor';

const pathToContributor = (contributor: Contributor) =>
  `/les-contributeurs/${contributor.id}/${slugify(contributor.name)}`;

export default pathToContributor;

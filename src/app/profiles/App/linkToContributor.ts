import pathToContributor from './pathToContributor';
import { Contributor } from 'app/lmem/contributor';

const linkToContributor = (contributor?: Contributor) =>
  contributor
    ? `${process.env.PROFILES_ORIGIN}${pathToContributor(contributor)}`
    : '';

export default linkToContributor;

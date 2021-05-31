import { Contributor } from 'libs/lmem/contributor';
import pathToContributor from './pathToContributor';

const linkToContributor = (contributor?: Contributor) =>
  contributor
    ? `${process.env.PROFILES_ORIGIN}${pathToContributor(contributor)}`
    : '';

export default linkToContributor;

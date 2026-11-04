import { Contributor } from '@dismoi/domain/contributor';
import pathToContributor from './pathToContributor';

const linkToContributor = (contributor?: Contributor) =>
  contributor
    ? `${process.env.PROFILES_ORIGIN}${pathToContributor(contributor)}`
    : '';

export default linkToContributor;

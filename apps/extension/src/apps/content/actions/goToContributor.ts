import { optionsRequested } from 'src/app/actions';
import pathToContributor from '../../../../apps/profiles/src/App/pathToContributor';
import { Contributor } from 'libs/lmem/contributor';

export default (contributor: Contributor) =>
  optionsRequested({ pathname: pathToContributor(contributor) });

import { optionsRequested } from 'libs/store/actions';
import pathToContributor from 'app/profiles/App/pathToContributor';
import { Contributor } from 'libs/domain/contributor';

export default (contributor: Contributor) =>
  optionsRequested({ pathname: pathToContributor(contributor) });

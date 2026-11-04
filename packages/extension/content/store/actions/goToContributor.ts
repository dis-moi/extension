import { optionsRequested } from 'libs/store/actions';
import pathToContributor from 'app/profiles/App/pathToContributor';
import { Contributor } from '@dismoi/domain/contributor';

export default (contributor: Contributor) =>
  optionsRequested({ pathname: pathToContributor(contributor) });

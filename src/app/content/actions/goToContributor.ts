import { optionsRequested } from 'app/actions';
import pathToContributor from 'app/profiles/App/pathToContributor';
import { Contributor } from 'app/lmem/contributor';

export default (contributor: Contributor) =>
  optionsRequested(pathToContributor(contributor));

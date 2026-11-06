import i18n from 'i18next';
import { optionsRequested } from 'libs/store/actions';
import pathToContributor from 'app/profiles/App/pathToContributor';
import { Contributor } from '@dismoi/domain/contributor';

/**
 * Le script de contenu initialise le singleton d'i18next à son démarrage
 * (`app/content/index.ts`), et n'a pas de composant React sous la main ici :
 * la traduction est donc lue sur ce singleton, mais au point d'appel, pour
 * que la dépendance soit visible.
 */
export default (contributor: Contributor) =>
  optionsRequested({
    pathname: pathToContributor(
      contributor,
      i18n.t('path.profiles.contributors'),
    ),
  });

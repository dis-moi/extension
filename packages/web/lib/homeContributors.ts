import { BaseContributor } from '@dismoi/domain/contributor';
import { BACKEND_ORIGIN } from 'libs/api/constants/origins';
import { getFacet } from 'libs/facets/getFacet';
import { contributorsIds } from '../contributorsIds';

/**
 * Les contributeurs mis en avant sur la page d'accueil.
 *
 * L'API est celle de `BACKEND_ORIGIN`, comme partout ailleurs : l'adresse
 * était auparavant écrite en dur sur l'ancien domaine `notices.bulles.fr`, ce
 * qui rendait la page d'accueil insensible à l'environnement visé.
 *
 * L'appel ne doit jamais faire échouer la génération : sans contributeurs, la
 * page se rend sans leur bandeau.
 */
export const fetchHomeContributors = async (): Promise<BaseContributor[]> => {
  const ids = contributorsIds[getFacet()];

  try {
    const response = await fetch(`${BACKEND_ORIGIN}contributors`);

    if (!response.ok) {
      return [];
    }

    const all: BaseContributor[] = await response.json();

    return all.filter((contributor) => ids.includes(contributor.id));
  } catch {
    return [];
  }
};

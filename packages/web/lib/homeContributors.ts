import { BaseContributor } from '@dismoi/domain/contributor';
import { BACKEND_ORIGIN } from 'libs/api/constants/origins';
import { getFacet } from 'libs/facets/getFacet';
import { contributorsIds } from '../contributorsIds';

// The call must never fail the build: with no contributors, the page
// renders without their strip.
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

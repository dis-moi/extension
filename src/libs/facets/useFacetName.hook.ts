import { facetName as lmelName } from './lmel.facet';
import { facetName as dismoiName } from './dismoi.facet';
import { getFacet } from './getFacet';

export function useFacetName(): string {
  switch (getFacet()) {
    case 'lmel':
      return lmelName;
  }

  return dismoiName;
}

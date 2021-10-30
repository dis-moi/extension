import { facetName as lmelName } from './lmel.facet';
import { facetName as dismoiName } from './dismoi.facet';

export function useFacetName() {
  switch (process.env.FACET) {
    case 'lmel':
      return lmelName;
  }

  return dismoiName;
}

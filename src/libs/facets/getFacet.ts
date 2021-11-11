import { Facet } from './facet';

export const getFacet = (): Facet =>
  (process.env.FACET || process.env.GATSBY_FACET || 'dismoi') as Facet;

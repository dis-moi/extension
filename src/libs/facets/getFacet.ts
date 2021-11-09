import { Facet } from './facet';

export const getFacet = (): Facet => (process.env.FACET || 'dismoi') as Facet;

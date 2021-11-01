import { Facet } from './facet';
import { dismoiTheme, lmelTheme, Theme } from './theme';

export function getTheme(): Theme {
  const facet = process.env.FACET as Facet;
  return facet === 'lmel' ? lmelTheme : dismoiTheme;
}

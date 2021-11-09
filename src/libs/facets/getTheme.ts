import { dismoiTheme, lmelTheme, Theme } from './theme';
import { getFacet } from './getFacet';

export function getTheme(): Theme {
  return getFacet() === 'lmel' ? lmelTheme : dismoiTheme;
}

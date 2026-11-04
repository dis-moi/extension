import { Theme } from './theme';
import { getTheme } from './getTheme';

export function useTheme(): Theme {
  return getTheme();
}

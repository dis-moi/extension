import * as styledComponents from 'styled-components';

import { Index } from '../theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Index>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;

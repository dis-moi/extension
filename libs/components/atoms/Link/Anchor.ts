import styled from 'styled-components';
import { Index } from 'libs/theme';

export const style = ({ theme }: { theme: Index }) => `
  display: inline-flex;
  align-items: baseline;
  color: ${theme.Button.default};
  font-weight: bold;
  text-decoration: underline;
  transition: all 0.2s ease-in-out;

  &[href] {
    cursor: pointer;
  }
`;

export default styled.a`
  ${style}
`;

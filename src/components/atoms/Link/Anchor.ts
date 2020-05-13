import styled from 'styled-components';
import { Theme } from 'app/theme';

export const style = ({ theme }: { theme: Theme }) => `
  color: ${theme.Button.default};
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${theme.Button.hover};
  }
`;

export default styled.a`
  ${style}
`;

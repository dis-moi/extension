import styled from 'styled-components';
import { Theme } from '../../app/theme';

export const style = `
  color: ${({ theme }: { theme: Theme }) => theme.activeColor};
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.secondaryColor};
  }
`;

export default styled.a`
  ${style}
`;

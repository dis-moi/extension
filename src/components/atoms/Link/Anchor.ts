import styled from 'styled-components';
import { Theme } from 'app/theme';

export const style = ({ theme }: { theme: Theme }) => `
  display: inline-flex;
  align-items: baseline;
  color: ${theme.Button.default};
  font-weight: bold;
  text-decoration: underline;
  transition: all 0.2s ease-in-out;
  
  &[href] {
    cursor: pointer;
    
    &:hover {
      color: ${theme.Button.hover};
    }
  }
`;

export default styled.a`
  ${style}
`;

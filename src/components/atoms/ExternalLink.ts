import styled from 'styled-components';

export default styled.a.attrs({ target: '_blank', rel: 'noopener noreferrer' })`
  color: ${props => props.theme.activeColor};
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
`;

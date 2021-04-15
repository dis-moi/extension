import styled from 'libs/types/styled-components';

export default styled.p`
  display: inline-block;
  margin: 0 0 0 auto;
  padding: 1em 1em 1em 0;
  font-size: 1.6em;
  color: ${props => props.theme.activeColor};
  text-transform: uppercase;
  font-weight: bold;
`;

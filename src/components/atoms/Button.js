import styled from 'styled-components';

export default styled.button`
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 3px;

  :hover {
    color: red;
  }

  color: ${props => props.theme.warningFav};
  border: 2px solid ${props => props.theme.rant};
`;

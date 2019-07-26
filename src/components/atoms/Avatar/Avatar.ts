import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: ${props => props.theme.contributorGrey};
  border-radius: 50%;
`;

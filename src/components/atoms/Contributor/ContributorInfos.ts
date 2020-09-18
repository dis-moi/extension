import styled from 'styled-components';
import UserName from '../UserName/UserName';

export default styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;

  ${UserName} {
    margin-bottom: 10px;
  }
`;

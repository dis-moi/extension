import styled from 'styled-components';
import Background from 'components/atoms/Intentions/Background';

export default styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  ${Background} {
    margin-right: 0;
  }
`;

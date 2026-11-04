import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

import styled from 'styled-components';

export default styled.div`
  width: 100%;
  max-height: 265px;
  overflow-y: auto;

  &:not(:empty) {
    margin-top: 18px;
  }
`;

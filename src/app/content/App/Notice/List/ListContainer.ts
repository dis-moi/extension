import styled from 'styled-components';

export default styled.div`
  width: 100%;
  max-height: 265px;
  margin-bottom: -18px;
  overflow-y: auto;

  &:not(:empty) {
    margin-top: 18px;
  }

  & > article:last-of-type {
    margin-bottom: 0 !important;
  }
`;

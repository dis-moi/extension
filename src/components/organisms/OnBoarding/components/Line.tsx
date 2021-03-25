import styled from 'styled-components';

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    svg {
      width: 205px;
      height: auto;
    }
  }

  &:last-of-type {
    margin-top: 60px;

    & > div {
      &:last-child {
        margin-left: 100px;
      }
    }
  }

  p {
    font-size: 28px;
  }

  button {
    justify-content: center;
    min-width: 360px;
  }
`;

export default Line;

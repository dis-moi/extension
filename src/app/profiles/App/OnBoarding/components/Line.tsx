import styled from 'styled-components';

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-of-type {
    svg {
      width: 205px;
      height: auto;
      @media (max-height: ${props => props.theme.breakpoint.md}) {
        width: calc(60px + 10vh);
      }
    }
  }

  &:last-of-type {
    margin-top: 60px;
    @media (max-height: ${props => props.theme.breakpoint.md}) {
      margin-top: 8vh;
    }

    & > div {
      &:not(:only-child):last-child {
        margin-left: 100px;
      }
    }
  }

  p {
    font-size: 22px;
    text-align: center;
  }

  button {
    justify-content: center;
    min-width: 216px;
  }
`;

export default Line;

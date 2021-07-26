import styled from 'styled-components';

export default styled.section`
  h1 {
    font-style: italic;
  }
  @media (max-height: ${props => props.theme.breakpoint.md}) {
    p {
      font-size: calc(10px + 2vh);
    }
    button {
      font-size: calc(10px + 2vh);
    }
    h1 {
      margin-bottom: 4vh;
    }
    h2 {
      font-size: calc(14px + 2vh);
    }
  }
`;

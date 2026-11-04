import styled from 'styled-components';

export default styled.div`
  & svg {
    animation: rotation 2s linear infinite;
  }

  @keyframes rotation {
    100% {
      transform: rotate(360deg);
    }
  }
`;

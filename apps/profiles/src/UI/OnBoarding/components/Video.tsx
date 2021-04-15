import styled, { keyframes } from 'styled-components';

const videoAnim = keyframes`
  from {
    height: 0;
  }
  to {
    height: 300px;
  }
`;

export default styled.video`
  width: 100%;
  height: 0;
  animation: ${videoAnim} 500ms linear forwards 0.1s;
`;

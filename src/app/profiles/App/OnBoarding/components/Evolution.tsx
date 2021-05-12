import styled, { keyframes } from 'styled-components';

const evolutionAnim = keyframes`
  from {
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  to {
    top: 40px;
    transform: translateY(0) translateX(-50%);
  }
`;

export default styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transform: translateY(-50%) translateX(-50%);
  animation: ${evolutionAnim} 500ms linear forwards 4s;
`;

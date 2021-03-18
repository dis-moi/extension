import styled, { keyframes } from 'styled-components';

const evolutionAnim = keyframes`
  from {
    top: 50%;
    transform: translateY(-50%);
  }
  to {
    top: 40px;
    transform: translateY(0);
  }
`;

export default styled('div')`
  position: absolute;
  top: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: auto;
  transform: translateY(-50%);
  animation: ${evolutionAnim} 500ms linear forwards 3s;
`;

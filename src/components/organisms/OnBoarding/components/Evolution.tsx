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
  transform: translateY(-50%);
  margin: auto;
  animation: ${evolutionAnim} 500ms linear forwards 2.5s;
`;

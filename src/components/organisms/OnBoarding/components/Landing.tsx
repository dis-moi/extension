import styled, { keyframes } from 'styled-components';

const titleAnim = keyframes`
  from {
    opacity: 0;
  }
  75% {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    transform: translateY(-42px);
  }`;
const titleLeftAnim = keyframes`
  from {
    margin-left: 0;
  }
  to {
    margin-left: 200px;
  }
`;
const titleLastAnim = keyframes`
  from {
    transform: translateY(-42px);
  }
  to {
    transform: translateY(-84px);
  }
`;

export default styled('section')`
  height: 100vh;
  text-align: center;
  span {
    display: block;
    animation: ${titleAnim} 1s linear forwards,
      ${titleLeftAnim} 250ms linear forwards 1.1s,
      ${titleLastAnim} 500ms linear forwards 2s;
  }
`;

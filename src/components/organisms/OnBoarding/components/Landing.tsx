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
  font-family: 'Lato', sans-serif;

  span {
    display: block;
    animation: ${titleAnim} 1.5s linear forwards,
      ${titleLeftAnim} 500ms linear forwards 1.5s,
      ${titleLastAnim} 500ms linear forwards 2.5s;
  }
`;

import styled, { keyframes } from 'styled-components';

const loaderPostionAnim = keyframes`
  from {
    height: auto;
    opacity: 0;
  }
  to {
    height: auto;
    opacity: 1;
  }
`;

export default styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0;
  animation: ${loaderPostionAnim} 500ms linear forwards 1.25s;
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 610px;
    margin-left: 64px;
  }
  > img {
    margin-top: 80px;
  }
`;

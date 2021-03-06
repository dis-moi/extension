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

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0;
  animation: ${loaderPostionAnim} 500ms linear forwards 1.5s;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: 80px;
  }

  > svg {
    width: 200px;
    margin-top: 80px;
  }
`;

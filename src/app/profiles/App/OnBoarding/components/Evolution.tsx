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

export default styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: auto;
  padding: 60px 0;
  background-color: #fff;
  transform: translateY(-50%) translateX(-50%);
  //animation: ${evolutionAnim} 500ms linear forwards 4s;
`;

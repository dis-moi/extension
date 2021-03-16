import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Bulleito } from '../../../atoms/icons';

const bullitoPositionAnim = keyframes`
  from {
    margin-left: 8%;
  }
  to {
    margin-left: 41%;
  }
`;

export default styled.div.attrs({ children: <Bulleito /> })`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  margin-left: 0;
  animation: ${bullitoPositionAnim} 500ms linear forwards 1s;
`;

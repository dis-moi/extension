import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Bullito } from 'components/atoms/icons';

interface BulleDisMoiProps {
  step: number;
}

const firstStep = keyframes`
  from {
    margin-left: -22px;
  }
  to {
    margin-left: 106px;
  }
`;
const secondStep = keyframes`
  from {
    margin-left: 106px;
  }
  to {
    margin-left: 300px;
  }
`;
const thirdStep = keyframes`
  from {
    margin-left: 310px;
  }
  to {
    margin-left: 500px;
  }
`;

export default styled.div.attrs({ children: <Bullito /> })<BulleDisMoiProps>`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  margin-left: -22px;
  animation: ${firstStep} 750ms linear forwards 2.5s,
    ${secondStep} 750ms linear forwards 5.5s,
    ${props => props.step === 2 && thirdStep} 750ms linear forwards 0s;
`;

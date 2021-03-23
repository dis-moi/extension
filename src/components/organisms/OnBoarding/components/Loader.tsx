import styled, { keyframes } from 'styled-components';
import { videoDuration } from './Video';

interface ProgessBarProps {
  step: number;
  bar: number;
}

const loaderExperienceAnim = keyframes`
  from {
    width: 20%;
  }
  to {
    width: 100%;
  }
`;

export default styled('div')`
  display: flex;
`;

export const ProgressBar = styled('div')<ProgessBarProps>`
  position: relative;
  width: 30%;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => props.theme.navInactive};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 12px;
    z-index: 9999;
    background-color: ${props => props.theme.activeColor};
    border-radius: 6px;
    width: 0;
  }
  &:nth-child(1):after {
    animation: ${props => props.step >= 0 && loaderExperienceAnim} 750ms linear
      forwards 2s;
  }
  &:nth-child(2):after {
    animation: ${props => props.step >= 1 && loaderExperienceAnim}
      ${videoDuration} linear forwards;
  }
  &:nth-child(3):after {
    animation: ${props => props.step >= 2 && loaderExperienceAnim} 750ms linear
      forwards;
  }

  &:not(:first-child) {
    margin-left: 16px;
  }
`;

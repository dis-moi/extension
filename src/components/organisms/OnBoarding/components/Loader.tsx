import styled, { keyframes } from 'styled-components';

interface ProgessBarProps {
  startAnim?: boolean;
  firstScreen?: boolean;
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
    animation: ${props => props.startAnim && loaderExperienceAnim} 750ms linear
      forwards ${props => (props.firstScreen ? '2s' : '0s')};
  }

  &:not(:first-child) {
    margin-left: 16px;
  }
`;

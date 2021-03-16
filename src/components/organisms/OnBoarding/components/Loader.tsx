import styled, { keyframes } from 'styled-components';

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
  > div:first-child::after {
    width: 20%;
    animation: ${loaderExperienceAnim} 500ms linear forwards 1.5s;
  }
  > div:nth-child(2)::after {
    width: 0;
    animation: ${loaderExperienceAnim} 500ms linear forwards 2.25s;
  }
`;

export const ProgressBar = styled('div')`
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
    width: 0;
    height: 12px;
    z-index: 9999;
    background-color: ${props => props.theme.activeColor};
    border-radius: 6px;
  }
  &:not(:first-child) {
    margin-left: 16px;
  }
`;

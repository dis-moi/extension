import styled from 'styled-components';
import { animated } from 'react-spring';

// for animation purpose
export const marginTop = 18;
export const height = 100;

interface Props {
  details?: boolean;
}

export default styled(animated.article)<Props>`
  theight: ${height}px;
  box-sizing: border-box;
  position: relative;
  will-change: 'transform, opacity';
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: ${props => (props.details ? '15px' : '16px')};

  &:first-of-type {
    margin-top: ${marginTop}px;
  }

  & + & {
    margin-top: ${marginTop}px;
  }
`;

import styled from 'styled-components';
import Avatar from './Avatar';

export default styled(Avatar)`
  position: relative;

  &:hover {
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      border-radius: 50%;
      opacity: 0.29;
    }
  }
`;

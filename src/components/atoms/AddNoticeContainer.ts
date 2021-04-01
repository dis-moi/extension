import styled from 'styled-components';
import CenterContainer from './CenterContainer';

interface AddNoticeContainerProps {
  shadow?: boolean;
}

export default styled(CenterContainer)<AddNoticeContainerProps>`
  width: 100%;
  position: absolute;
  // bottom: 60px; // In case of ServiceMessageLine
  bottom: 14px;
  box-shadow: ${props => (props.shadow ? '0 -2px 2px rgba(0, 0, 0, 0.4)' : '')};
  padding-top: 14px;
`;

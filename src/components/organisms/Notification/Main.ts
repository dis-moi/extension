import styled from 'styled-components';
import { animated } from 'react-spring';

interface Props {
  hasNotices?: boolean;
}

export default styled(animated.main)<Props>`
  position: relative;
  height: 342px;
  background-color: ${props =>
    props.hasNotices ? props.theme.colorGrey200 : props.theme.colorWhite};
`;

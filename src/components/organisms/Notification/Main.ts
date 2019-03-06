import styled from 'styled-components';

interface Props {
  hasNotices?: boolean;
}

export default styled('main')<Props>`
  position: relative;
  height: 342px;
  background-color: ${props =>
    props.hasNotices ? props.theme.listBg : props.theme.accountListBg};
`;

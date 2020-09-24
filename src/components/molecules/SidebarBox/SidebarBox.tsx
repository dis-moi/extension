import styled from 'styled-components';
import { Box, Button, ButtonWithIcon, Link, List } from '../../atoms';

const SidebarBox = styled(Box)`
  margin-bottom: ${props => props.theme.marginL};
  padding: 10px;

  ${Button} {
    margin-top: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 15px;
    min-width: 131px;
  }

  ${ButtonWithIcon} {
    margin: 16px auto 0;
  }

  ${Link} {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;

    &::after {
      content: ' >';
      margin-left: 6px;
    }
  }

  ${List} {
    margin-bottom: 0;
    font-size: 16px;
  }
`;

export default SidebarBox;

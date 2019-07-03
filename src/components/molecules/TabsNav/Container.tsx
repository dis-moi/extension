import styled from 'styled-components';
import Tab from 'components/atoms/Tab/Tab';

const TabsNav = styled.nav`
  display: flex;
  border-bottom: 2px solid ${props => props.theme.activeColor}

  ${Tab}:not(:first-of-type) {
    margin-left: 20px;
  }
`;

export default TabsNav;

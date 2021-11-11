import styled from 'styled-components';

const NavDesktop = styled.nav`
  display: none;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a,
    button {
      margin-left: 20px;
    }
  }
`;

export default NavDesktop;

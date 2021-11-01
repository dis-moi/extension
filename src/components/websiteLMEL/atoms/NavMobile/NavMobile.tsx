import styled from 'styled-components';

const NavMobile = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  a,
  button {
    margin-top: 30px;
  }
  button {
    font-size: ${props => props.theme.websiteLMEL.textSizeDesktop};
    height: 34px;
    padding-bottom: 3px;
  }
  a:last-child {
    transform-origin: center;
    transform: scale(0.8);
  }
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: none;
  }
`;

export default NavMobile;

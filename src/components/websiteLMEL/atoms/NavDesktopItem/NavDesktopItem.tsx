import styled from 'styled-components';

const NavDesktopItem = styled.a`
  color: inherit;
  transition: color ${props => props.theme.websiteLMEL.animationFastDuration};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  line-height: 1;
  font-family: ${props => props.theme.websiteLMEL.fontFamily};
  font-size: ${props => props.theme.websiteLMEL.textSizeMobile};
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: ${props => props.theme.websiteLMEL.textSizeTablet};
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: ${props => props.theme.websiteLMEL.textSizeDesktop};
  }
  &:hover {
    color: ${props => props.theme.websiteLMEL.secondaryColor} !important;
  }
  &:active {
    color: ${props => props.theme.websiteLMEL.activeColor} !important;
  }
`;

export default NavDesktopItem;

import styled from 'styled-components';

const NavDesktopItem = styled.a`
  color: inherit;
  transition: color ${props => props.theme.website.animationFastDuration};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  line-height: 1;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${props => props.theme.website.textSizeMobile};
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: ${props => props.theme.website.textSizeTablet};
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: ${props => props.theme.website.textSizeDesktop};
  }
  &:hover {
    color: ${props => props.theme.website.secondaryColor} !important;
  }
  &:active {
    color: ${props => props.theme.website.activeColor} !important;
  }
`;

export default NavDesktopItem;

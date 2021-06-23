import styled from 'styled-components';

const NavMobileItem = styled.a`
  color: white;
  transition: color ${props => props.theme.website.animationFastDuration};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  padding: 0 15px;
  line-height: 1;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: ${props => props.theme.website.textSizeDesktop};
  &:hover {
    color: ${props => props.theme.website.secondaryColor} !important;
  }
  &:active {
    color: ${props => props.theme.website.activeColor} !important;
  }
`;

export default NavMobileItem;

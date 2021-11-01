import styled from 'styled-components';

const NavMobileItem = styled.a`
  color: white;
  transition: color ${props => props.theme.websiteLMEL.animationFastDuration};
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  padding: 0 15px;
  line-height: 1;
  font-family: ${props => props.theme.websiteLMEL.fontFamily};
  font-size: ${props => props.theme.websiteLMEL.textSizeDesktop};
  &:hover {
    color: ${props => props.theme.websiteLMEL.secondaryColor} !important;
  }
  &:active {
    color: ${props => props.theme.websiteLMEL.activeColor} !important;
  }
`;

export default NavMobileItem;

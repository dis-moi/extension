import {
  NavLink as ReactRouterNavLink,
  NavLinkProps as ReactRouterDomNavLinkProps
} from 'react-router-dom';
import styled from 'styled-components';

type NavLinkProps = ReactRouterDomNavLinkProps;

export default styled(ReactRouterNavLink).attrs({
  replace: true,
  activeClassName: 'active'
})<NavLinkProps>`
  padding-top: 10px;
  padding-bottom: 12px;
  font-size: 12px;
  font-weight: 900;
  color: ${props => props.theme.badge.backgroundColor.hasAllNoticesRead};
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  border-top: 2px solid transparent;
  transition: all 0.2s ease-in-out;

  &.${props => props.activeClassName}, &:hover {
    border-top: 2px solid ${props => props.theme.navActive};
    color: ${props => props.theme.activeColor};
  }
`;

import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

export default styled(NavLink).attrs({
  replace: true,
  activeClassName: 'active'
})<NavLinkProps>`
  padding: 8px 16px 8px;
  font-size: 18px;
  line-height: 1.2;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: none;
  text-decoration: none;
  color: ${props => props.theme.textColor};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  border-radius: 0;

  &:hover {
    color: ${props => props.theme.textColor};
  }

  &.${props => props.activeClassName} {
    color: '#000';
    border-bottom-color: ${props => props.theme.textColor};
  }
`;

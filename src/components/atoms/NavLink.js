import React from 'react';
import { NavLink as ReactRouterNavLink} from 'react-router-dom';
import styled from 'styled-components';

export default styled(ReactRouterNavLink).attrs({ replace: true, activeClassName: 'active' })`
    box-sizing: border-box;
    width: 40px;
    padding-top: 5px;
    padding-bottom: 6px;
    text-align: center;
    border-top: 2px solid transparent;
    
    &.${props => props.activeClassName} {
      border-top: 2px solid ${props => props.theme.navActive}
    }

    & > svg {
        height: 28px;
        fill: ${props => props.theme.navInactive};
    }
    
        
    &.${props => props.activeClassName} > svg {
      fill: ${props => props.theme.navActive}
    }
`;
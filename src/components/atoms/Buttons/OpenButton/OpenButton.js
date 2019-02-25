import React from 'react';
import styled from 'styled-components';
import OpenIcon from '../../icons/Arrow';

export default styled.div.attrs({ children: <OpenIcon /> })`
   padding:0;
   margin-left: auto;
   border: none;
   cursor: pointer;
   width: auto;
   height: 13px;
   stroke: ${props => props.theme.activeColor};
   transform: rotate(180deg);
`;


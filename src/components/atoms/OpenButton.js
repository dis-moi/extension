import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import OpenIcon from './icons/Arrow';

export default styled(Link).attrs({ children: <OpenIcon />, role: 'button' })`
   padding:0;
   margin-left: auto;
   border: none;
   cursor: pointer;
   width: auto;
   height: 13px;
   stroke: ${props => props.theme.activeColor};
`;


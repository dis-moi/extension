import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CloseIcon from './icons/Close';

export default styled(Button).attrs({ children: <CloseIcon /> })`
   margin-left: auto;
   width: 13px;
   height: 13px;
   background: none;
   fill: ${props => props.theme.activeColor};
`;


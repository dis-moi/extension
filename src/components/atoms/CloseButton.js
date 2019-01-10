import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CloseIcon from './icons/Delete';

export default styled(Button).attrs({ children: <CloseIcon /> })`
   margin-left: auto;
   width: 13px;
   height: 13px;
   background: none;
   stroke: ${props => props.theme.activeColor};
`;


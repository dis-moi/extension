import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CloseIcon from './icons/Delete';

export default styled(Button).attrs({ children: <CloseIcon /> })`
   width: 13px;
   height: 13px;
   stroke: ${props => props.theme.activeColor};
`;


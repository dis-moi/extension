import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CloseIcon from './icons/Close';

export default styled(Button).attrs({ children: <CloseIcon /> })`
   width: auto;
   height: 13px;
   stroke: ${props => props.theme.darkBlue};
`;


import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import OpenIcon from './icons/Arrow';

export default styled(Button).attrs({ children: <OpenIcon /> })`
   width: auto;
   height: 13px;
   stroke: ${props => props.theme.activeColor};
`;


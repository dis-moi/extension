import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import ArrowIcon from './icons/Arrow';

export default styled(Button).attrs({ children: <ArrowIcon /> })`
    height: 13px;
    padding-right: 10px;
    background: none;
    stroke: ${props => props.theme.activeColor};
`;


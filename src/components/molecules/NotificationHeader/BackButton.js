import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import ArrowIcon from '../../atoms/icons/Arrow';

export default styled(Button).attrs({ children: <ArrowIcon /> })`
    height: 30px;
    padding-right: 10px;
    stroke: ${props => props.theme.activeColor};
`;


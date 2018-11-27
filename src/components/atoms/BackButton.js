import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import ArrowIcon from './icons/Arrow';

export default styled(Button).attrs({ children: <ArrowIcon /> })`
    margin-right: 10px;
`;


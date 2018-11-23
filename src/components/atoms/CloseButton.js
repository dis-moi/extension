import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CloseIcon from './icons/Close';

export default styled(Button).attrs({ children: <CloseIcon /> })`
   width: 1em;
   height: 1em;
`;


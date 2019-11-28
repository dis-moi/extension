import React from 'react';
import styled from 'styled-components';
import OpenIcon from '../../icons/Arrow';
import Button from '../Button';

export default styled(Button).attrs({ children: <OpenIcon /> })`
  padding: 0;
  margin-left: auto;
  border: none;
  cursor: pointer;
  width: auto;
  height: 100%;
  stroke: ${props => props.theme.primaryColor};
  transform: rotate(180deg);
  display: flex;
  align-items: center;
`;

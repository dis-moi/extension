import React from 'react';
import styled from 'styled-components';
import OpenIcon from '../../icons/Arrow';
import TransparentButton from '../TransparentButton';

export default styled(TransparentButton).attrs({ children: <OpenIcon /> })`
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

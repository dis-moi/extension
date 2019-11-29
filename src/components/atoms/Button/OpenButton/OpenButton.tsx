import React from 'react';
import styled from 'styled-components';
import OpenIcon from '../../icons/Arrow';

export default styled.div.attrs({ children: <OpenIcon /> })`
  align-self: flex-end;
  width: auto;
  height: 13px;
  margin-left: auto;
  padding: 0;
  border: none;
  stroke: ${props => props.theme.primaryColor};
  transform: rotate(180deg);
  cursor: pointer;
`;

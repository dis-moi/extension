import React from 'react';
import styled from 'styled-components';
import DeleteIcon from './icons/Delete';

export default styled.button.attrs({ children: <DeleteIcon /> })`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 17px;
  height: 17px;
  padding: 0 4px;
  margin-left: 16px;
  fill: #fff;
  background: #A6B1C0;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  & > svg {
      width: 9px;
      height: 9px;
  }
`;

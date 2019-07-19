import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import DeleteIcon from './DeleteIcon';

export default styled(Button).attrs({ children: <DeleteIcon /> })`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 18px;
  height: 23px;
  margin-left: 16px;

  &:hover svg path,
  &:hover svg rect {
    fill: ${props => props.theme.formError};
  }
`;

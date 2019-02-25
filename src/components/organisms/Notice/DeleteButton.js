import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import DeleteIcon from './DeleteIcon';

export default styled(Button).attrs({ children: <DeleteIcon /> })`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 17px;
  height: 17px;
  padding: 0 4px;
  margin-left: 16px;
  background: ${props => props.theme.navInactive};
  border-radius: 50%;

  & > svg {
      fill: #fff;
      width: 9px;
      height: 9px;
  }

  &:hover {
    background-color: ${props => props.theme.formError}
  }
`;

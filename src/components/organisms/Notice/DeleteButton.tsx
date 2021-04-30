import React from 'react';
import styled from 'styled-components';
import DeleteIcon from './DeleteIcon';
import { TransparentButton } from 'components/atoms/Button';

export default styled(TransparentButton).attrs({
  children: <DeleteIcon />
})`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 18px;
  height: 23px;
  margin-left: 16px;

  svg {
    fill: ${props => props.theme.secondaryColor};
  }

  &:hover {
    svg {
      fill: ${props => props.theme.colorAlert};
    }
  }
`;

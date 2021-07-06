import React from 'react';
import styled from 'styled-components';
import CloseIcon from 'components/atoms/icons/Close';
import { TransparentButton } from 'components/atoms/Button';

export default styled(TransparentButton).attrs({ children: <CloseIcon /> })`
  margin-left: auto;
  width: 13px;
  height: 13px;
`;

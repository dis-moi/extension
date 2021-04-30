import React from 'react';
import styled from 'styled-components';
import { TransparentButton } from 'components/atoms/Button';
import ArrowIcon from 'components/atoms/icons/Arrow';

export default styled(TransparentButton).attrs({ children: <ArrowIcon /> })`
  height: 30px;
  padding-right: 10px;
  stroke: ${props => props.theme.colorPrimary};
`;

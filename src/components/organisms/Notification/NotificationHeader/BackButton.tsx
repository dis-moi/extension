import React from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import ArrowIcon from 'components/atoms/icons/Arrow';

export default styled(Button).attrs({ children: <ArrowIcon /> })`
  height: 30px;
  padding-right: 10px;
  stroke: ${props => props.theme.colorPrimary};
`;

import React from 'react';
import styled from 'styled-components';
import { Button, BorderButton, CenterContainer } from 'components/atoms';

export default styled(CenterContainer)`
  margin-bottom: 15px;

  ${BorderButton} {
    margin-left: 20px;
  }
`;

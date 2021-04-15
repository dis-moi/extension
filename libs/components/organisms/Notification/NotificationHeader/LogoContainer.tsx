import React from 'react';
import styled from 'styled-components';
import Logo from 'libs/components/atoms/icons/LogoDismoi';

export default styled.h1.attrs({ children: <Logo /> })`
  margin: 0 0 0 auto;

  & svg {
    width: auto;
    height: 22px;
    vertical-align: middle;
  }
`;

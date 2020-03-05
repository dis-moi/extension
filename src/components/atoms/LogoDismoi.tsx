import React from 'react';
import styled from 'styled-components';
import LogoDismoi from './icons/LogoDismoi';

const LogoWrapper = styled.div`
  height: 42px;

  & > svg {
    width: auto;
    height: 100%;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoDismoi />
    </LogoWrapper>
  );
};

export default Logo;

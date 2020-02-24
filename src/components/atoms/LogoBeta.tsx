import React from 'react';
import styled from 'styled-components';
import LogoBeta from './icons/Logo';

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
      <LogoBeta />
    </LogoWrapper>
  );
};

export default Logo;

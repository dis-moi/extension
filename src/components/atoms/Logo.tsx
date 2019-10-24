import React from 'react';
import styled from 'styled-components';
import LogoBulles from './icons/Logo';

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
      <LogoBulles />
    </LogoWrapper>
  );
};

export default Logo;

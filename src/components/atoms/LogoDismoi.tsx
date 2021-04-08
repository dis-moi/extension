import React from 'react';
import styled from 'styled-components';
import LogoDisMoi from './icons/LogoDisMoi';

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
      <LogoDisMoi />
    </LogoWrapper>
  );
};

export default Logo;

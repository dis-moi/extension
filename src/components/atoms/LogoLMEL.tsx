import React from 'react';
import styled from 'styled-components';
import LogoLMEL from './icons/LogoLMEL';

const LogoWrapper = styled.div`
  height: 42px;

  & > svg {
    width: auto;
    height: 100%;
  }
`;

const WrappedLogoLMEL = () => {
  return (
    <LogoWrapper>
      <LogoLMEL />
    </LogoWrapper>
  );
};

export default WrappedLogoLMEL;

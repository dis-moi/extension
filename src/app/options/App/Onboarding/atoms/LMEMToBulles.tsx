import React from 'react';
import styled from 'styled-components';
import LmemLogo from 'assets/img/logo/logo-lmem-blue.png';
import BullesLogo from 'components/atoms/Logo';
import Arrow from './ArrowLMEMToBulles';

const LMEMToBullesWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 16px;
  }
`;

const LMEMToBulles = () => (
  <LMEMToBullesWrapper>
    <img src={LmemLogo} alt="Le Même en Mieux" />
    <Arrow />
    <BullesLogo />
  </LMEMToBullesWrapper>
);

export default LMEMToBulles;

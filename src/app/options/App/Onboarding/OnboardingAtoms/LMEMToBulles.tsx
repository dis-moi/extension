import React from 'react';
import styled from 'styled-components';
import LmemLogo from 'assets/img/logo/logo-lmem-blue.png';
import BullesLogo from 'components/atoms/LogoBeta';
import Arrow from './ArrowLMEMToBulles';
import Intro from './OnboardingIntro';
import Title from './OnboardingTitle';

const LMEMToBullesWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :not(:first-child) {
    margin-left: 16px;
  }
`;

const TitleLMEM = styled(Title)`
  color: ${props => props.theme.activeColor};
`;

const LMEMToBulles = () => (
  <Intro>
    <LMEMToBullesWrapper>
      <img src={LmemLogo} alt="Le Même en Mieux" />
      <Arrow />
      <BullesLogo />
    </LMEMToBullesWrapper>

    <TitleLMEM>
      Votre extension s&apos;ouvre à de nouveaux contributeurs
      <br /> et change de nom.
    </TitleLMEM>
  </Intro>
);

export default LMEMToBulles;

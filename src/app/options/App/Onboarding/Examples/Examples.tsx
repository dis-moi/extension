import React from 'react';
import styled from 'styled-components';

import BullesLogo from 'components/atoms/icons/Logo';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Title from '../OnboardingAtoms/OnboardingTitle';
import {
  SuggestionsScreen,
  SuggestionsScreenProps
} from '../../Settings/SuggestionsScreen/SuggestionsScreen';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';

const Title2 = styled(Title)`
  margin-top: 0;
  margin-bottom: 40px;
  color: ${props => props.theme.activeColor};
`;

interface ExamplesScreenProps extends SuggestionsScreenProps {
  updatedFromLmem: boolean;
}

export default ({
  updatedFromLmem,
  suggestions,
  subscribe,
  unsubscribe
}: ExamplesScreenProps) => (
  <>
    <Intro>
      {updatedFromLmem ? <LMEMToBulles /> : <BullesLogo />}

      <Title>Installation réussie !</Title>
      <Title2>Découvrez des exemples de vos contributeurs !</Title2>
    </Intro>

    <SuggestionsScreen
      suggestions={suggestions}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
    />
  </>
);

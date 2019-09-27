import React from 'react';
import styled from 'styled-components';

import BullesLogo from 'components/atoms/LogoBeta';
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

      <Title>
        Félicitations, vous êtes maintenant abonné : vous revevrez les messages
        de vos contributeurs durant votre navigation.
      </Title>
      <Title2>Ci-dessous vous pouvez tester quelques exemples.</Title2>
    </Intro>

    <SuggestionsScreen
      suggestions={suggestions}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
    />
  </>
);

import React from 'react';
import styled from 'styled-components';

import BullesLogo from 'components/atoms/LogoBeta';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Title from '../OnboardingAtoms/OnboardingTitle';
import SuggestionsScreen, {
  SuggestionsScreenProps
} from '../../Settings/SuggestionsScreen/SuggestionsScreen';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';

const Title2 = styled(Title)`
  margin-top: 20px;
  margin-bottom: 40px;
  color: ${props => props.theme.activeColor};
`;

interface ExamplesScreenProps extends SuggestionsScreenProps {
  updatedFromLmem: boolean;
}

export default ({
  suggestions,
  subscribe,
  unsubscribe
}: ExamplesScreenProps) => (
  <>
    <Wrapper>
      <Intro>
        <BullesLogo />

        <Title>
          Félicitations, vous êtes maintenant abonné : <br />
          vous recevrez les messages de vos contributeurs durant votre
          navigation.
        </Title>
        <Title2>Ci-dessous vous pouvez tester quelques exemples.</Title2>
      </Intro>
    </Wrapper>

    <SuggestionsScreen
      suggestions={suggestions}
      subscribe={subscribe}
      unsubscribe={unsubscribe}
      showExampleLink
      highlightExampleLink
    />
  </>
);

import React from 'react';
import styled from 'styled-components';
import SubscriptionsScreen from '../../Settings/SubscriptionsScreen';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Title from '../OnboardingAtoms/OnboardingTitle';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Header from '../../Header';

const Title2 = styled(Title)`
  margin-top: 20px;
  margin-bottom: 40px;
  color: ${props => props.theme.activeColor};
`;

export default () => (
  <>
    <Header />
    <Wrapper>
      <Intro>
        <Title2>
          Voici votre réseau d&apos;informateurs sur les pages web que vous
          visitez.
        </Title2>
        <Title>
          Si les bulles de l&apos;un d&apos;entre eux ne vous intéressent pas,
          vous pouvez à tout moment vous désabonner.
        </Title>
      </Intro>
    </Wrapper>

    <SubscriptionsScreen noSidebar highlightExampleLink />
  </>
);

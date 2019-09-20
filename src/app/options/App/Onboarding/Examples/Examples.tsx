import React from 'react';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Logo from 'components/atoms/icons/Logo';
import Title from '../OnboardingAtoms/OnboardingTitle';

import { SuggestionsScreen } from '../../Settings/SuggestionsScreen/SuggestionsScreen';
import { generateContributor } from 'test/fakers/generateContributor';

const Title2 = styled(Title)`
  margin-top: 0;
  margin-bottom: 40px;
  color: ${props => props.theme.activeColor};
`;

export default () => (
  <>
    <Intro>
      <Logo />

      <Title>Installation réussie !</Title>
      <Title2>Découvrez des exemples de vos contributeurs !</Title2>
    </Intro>

    <SuggestionsScreen
      suggestions={[
        generateContributor(),
        { ...generateContributor(), subscribed: true },
        generateContributor()
      ]}
      subscribe={() => action('subscribe')}
      unsubscribe={() => action('unsubscribe')}
    />
  </>
);

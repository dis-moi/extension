import React from 'react';
import { storiesOf } from '@storybook/react';
import OnboardingSteps from './OnboardingSteps';

storiesOf('screens/Onboarding/components/OnboardingSteps', module).add(
  'normal',
  () => <OnboardingSteps />
);

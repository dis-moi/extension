import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import TOS from './TOS';
import { action } from '@storybook/addon-actions';

storiesOf('screens/Onboarding/ToS', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Lmem --> Bulles', () => (
    <TOS
      acceptTermsOfService={action('acceptTermsOfService')}
      termsOfServiceAccepted={false}
      updatedFromLmem={true}
    />
  ))
  .add('Bulles', () => (
    <TOS
      acceptTermsOfService={action('acceptTermsOfService')}
      termsOfServiceAccepted={false}
      updatedFromLmem={false}
    />
  ));

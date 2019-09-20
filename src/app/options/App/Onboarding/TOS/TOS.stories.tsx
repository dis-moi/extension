import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TOS from './TOS';

storiesOf('screens/Onboarding/ToS', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Lmem --> Bulles', () => (
    <TOS
      acceptTermsOfService={action('acceptTermsOfService')}
      termsOfServiceAccepted={false}
      updatedFromLmem={true}
      next={action('next')}
    />
  ))
  .add('Bulles', () => (
    <TOS
      acceptTermsOfService={action('acceptTermsOfService')}
      termsOfServiceAccepted={false}
      updatedFromLmem={false}
      next={action('next')}
    />
  ))
  .add('Bulles (TosAccepted)', () => (
    <TOS
      acceptTermsOfService={action('acceptTermsOfService')}
      termsOfServiceAccepted={true}
      updatedFromLmem={false}
      next={action('next')}
    />
  ));

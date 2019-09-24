import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TOS from './TOS';

storiesOf('screens/Onboarding/ToS', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Lmem --> Bulles', () => (
    <TOS
      termsOfServiceAccepted={false}
      updatedFromLmem={true}
      onContinue={action('onContinue')}
    />
  ))
  .add('Bulles', () => (
    <TOS
      termsOfServiceAccepted={false}
      updatedFromLmem={false}
      onContinue={action('onContinue')}
    />
  ))
  .add('Bulles (TosAccepted)', () => (
    <TOS
      termsOfServiceAccepted={true}
      updatedFromLmem={false}
      onContinue={action('onContinue')}
    />
  ));

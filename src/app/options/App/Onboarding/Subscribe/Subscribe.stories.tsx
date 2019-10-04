import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Subscribe from './Subscribe';
import Wrapper from '../../ScreenWrapper';
import { optionsStoreDecorator } from '../../../../../../.storybook/config';

storiesOf('screens/Onboarding/Subscribe', module)
  .addDecorator(optionsStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Wrapper>{getStory()}</Wrapper>
    </Router>
  ))
  .add('Lmem --> Bulles', () => (
    <Subscribe
      updatedFromLmem={true}
      nbSubscriptions={0}
      next={action('next')}
    />
  ))
  .add('Bulles', () => (
    <Subscribe
      updatedFromLmem={false}
      nbSubscriptions={0}
      next={action('next')}
    />
  ))
  .add('Bulles (1 subscriptions)', () => (
    <Subscribe
      updatedFromLmem={false}
      nbSubscriptions={1}
      next={action('next')}
    />
  ));
